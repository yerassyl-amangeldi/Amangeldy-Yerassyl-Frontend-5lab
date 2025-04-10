import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { useLanguage } from '../contexts/LanguageContext';

const TASK_STATUSES = {
  en: ['In Progress', 'Completed', 'Planned', 'Active', 'Ongoing'],
  ru: ['В процессе', 'Завершено', 'Запланировано', 'Активно', 'Продолжается']
};

const initialState = { title: '', status: 'In Progress' }; 

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function TaskForm({ projectId }) {
  const [formState, dispatch] = useReducer(taskReducer, initialState);
  const reduxDispatch = useDispatch();
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(addTask({ id: Date.now(), projectId, ...formState }));
    dispatch({ type: 'RESET' });
  };

  const statuses = language === 'en' ? TASK_STATUSES.en : TASK_STATUSES.ru;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder={language === 'en' ? 'Task title' : 'Название задачи'}
        value={formState.title}
        onChange={(e) =>
          dispatch({ type: 'SET_FIELD', field: 'title', value: e.target.value })
        }
      />
      <select
        value={formState.status}
        onChange={(e) =>
          dispatch({ type: 'SET_FIELD', field: 'status', value: e.target.value })
        }
      >
        {statuses.map((status, index) => (
          <option key={index} value={TASK_STATUSES.en[index]}>
            {status}
          </option>
        ))}
      </select>
      <button type="submit">{language === 'en' ? 'Add Task' : 'Добавить задачу'}</button>
    </form>
  );
}

export default TaskForm;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLanguage } from '../contexts/LanguageContext';
import { addTask, updateTask } from '../redux/tasksSlice';

const TASK_STATUSES = {
  en: ['In Progress', 'Completed', 'Planned', 'Active', 'Ongoing'],
  ru: ['В процессе', 'Завершено', 'Запланировано', 'Активно', 'Продолжается']
};

function Tasks() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const { language } = useLanguage();
  const dispatch = useDispatch();

  console.log('Tasks in state:', tasks);
  console.log('Loading:', loading);
  console.log('Error:', error);

  const [newTask, setNewTask] = useState({ title: '', status: 'In Progress' });

  if (loading) return <div className="loading">{language === 'en' ? 'Loading...' : 'Загрузка...'}</div>;
  if (error) return <div className="loading">{language === 'en' ? 'Error loading tasks' : 'Ошибка загрузки задач'}</div>;

  const translateStatus = (status) => {
    const index = TASK_STATUSES.en.indexOf(status);
    return language === 'en' ? status : TASK_STATUSES.ru[index] || status;
  };

  const getStatusClass = (status) => {
    return `status status-${status.toLowerCase().replace(' ', '-')}`;
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return; 
    dispatch(addTask({ id: Date.now(), projectId: 0, ...newTask })); 
    setNewTask({ title: '', status: 'In Progress' });
  };

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, status: newStatus }));
  };

  return (
    <div className="page tasks">
      <h1>{language === 'en' ? 'All Tasks' : 'Все задачи'}</h1>
      {tasks.length === 0 ? (
        <p>{language === 'en' ? 'No tasks available' : 'Задачи отсутствуют'}</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="status-select"
              >
                {TASK_STATUSES.en.map((status, index) => (
                  <option key={index} value={status}>
                    {language === 'en' ? status : TASK_STATUSES.ru[index]}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder={language === 'en' ? 'Task title' : 'Название задачи'}
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          {TASK_STATUSES.en.map((status, index) => (
            <option key={index} value={status}>
              {language === 'en' ? status : TASK_STATUSES.ru[index]}
            </option>
          ))}
        </select>
        <button type="submit">{language === 'en' ? 'Add Task' : 'Добавить задачу'}</button>
      </form>
    </div>
  );
}

export default Tasks;
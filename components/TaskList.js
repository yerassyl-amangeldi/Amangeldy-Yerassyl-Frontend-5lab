import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function TaskList({ tasks }) {
  const { language } = useLanguage();

  return (
    <div className="task-list">
      <h2>{language === 'en' ? 'Tasks' : 'Задачи'}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
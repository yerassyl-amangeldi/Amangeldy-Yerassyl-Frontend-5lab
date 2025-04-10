import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import TaskForm from '../components/TaskForm';

// Определяем соответствие статусов для перевода
const TASK_STATUSES = {
  en: ['In Progress', 'Completed', 'Planned', 'Active', 'Ongoing'],
  ru: ['В процессе', 'Завершено', 'Запланировано', 'Активно', 'Продолжается']
};

function ProjectDetails() {
  const { id } = useParams();
  const project = useSelector((state) =>
    state.projects.projects.find((p) => p.id === parseInt(id))
  );
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((t) => t.projectId === parseInt(id))
  );
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const { language } = useLanguage();

  if (loading) return <div className="loading">{language === 'en' ? 'Loading...' : 'Загрузка...'}</div>;
  if (error) return <div className="loading">{language === 'en' ? 'Error loading tasks' : 'Ошибка загрузки задач'}</div>;
  if (!project) return <div className="loading">{language === 'en' ? 'Project not found' : 'Проект не найден'}</div>;

  // Функция для перевода статуса
  const translateStatus = (status) => {
    const index = TASK_STATUSES.en.indexOf(status);
    return language === 'en' ? status : TASK_STATUSES.ru[index] || status;
  };

  // Функция для получения класса статуса
  const getStatusClass = (status) => {
    return `status status-${status.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <div className="page project-details">
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <h2>{language === 'en' ? 'Tasks' : 'Задачи'}</h2>
      {tasks.length === 0 ? (
        <p>{language === 'en' ? 'No tasks available' : 'Задачи отсутствуют'}</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <span className={getStatusClass(task.status)}>
                {translateStatus(task.status)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <TaskForm projectId={parseInt(id)} />
    </div>
  );
}

export default ProjectDetails;
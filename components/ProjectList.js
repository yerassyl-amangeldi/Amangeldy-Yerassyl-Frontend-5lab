import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function ProjectList({ projects }) {
  const { language } = useLanguage();

  return (
    <div className="project-list">
      <h2>{language === 'en' ? 'Projects' : 'Проекты'}</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
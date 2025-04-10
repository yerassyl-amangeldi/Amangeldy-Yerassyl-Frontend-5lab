import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const projects = useSelector((state) => state.projects.projects);
  const [filter, setFilter] = useState('');
  const { language } = useLanguage();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [projects, filter]);

  return (
    <div className="page dashboard">
      <h1>{language === 'en' ? 'Dashboard' : 'Панель управления'}</h1>
      <input
        type="text"
        placeholder={language === 'en' ? 'Search projects...' : 'Поиск проектов...'}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredProjects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link> - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
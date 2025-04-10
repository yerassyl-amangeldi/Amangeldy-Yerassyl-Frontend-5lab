import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login') return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">PulseFlow</span>
      </div>
      <div className="navbar-links">
        <Link to="/">{language === 'en' ? 'Dashboard' : 'Панель управления'}</Link>
        <Link to="/tasks">{language === 'en' ? 'Tasks' : 'Задачи'}</Link> 
        <Link to="/settings">{language === 'en' ? 'Settings' : 'Настройки'}</Link>
      </div>
      <div className="navbar-user">
        <span>{language === 'en' ? 'User:' : 'Пользователь:'} {user ? user.name : 'Guest'}</span>
        {user && (
          <button onClick={logout} className="logout-btn">
            {language === 'en' ? 'Logout' : 'Выйти'}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <div className="page settings">
      <h1>{language === 'en' ? 'Settings' : 'Настройки'}</h1>
      <p>{language === 'en' ? 'User:' : 'Пользователь:'} {user.name}</p>
      <button onClick={toggleTheme}>
        {language === 'en'
          ? `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`
          : `Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
      </button>
      <button onClick={toggleLanguage}>
        {language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
      </button>
      <button onClick={logout}>
        {language === 'en' ? 'Logout' : 'Выйти'}
      </button>
    </div>
  );
}

export default Settings;
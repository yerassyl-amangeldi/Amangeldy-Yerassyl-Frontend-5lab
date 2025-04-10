import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="page error">
      <h1>404</h1>
      <p>{language === 'en' ? 'Page Not Found' : 'Страница не найдена'}</p>
    </div>
  );
}

export default NotFound;
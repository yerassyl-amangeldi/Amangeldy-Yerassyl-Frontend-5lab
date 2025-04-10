import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function ServerError() {
  const { language } = useLanguage();
  return (
    <div className="page error">
      <h1>500</h1>
      <p>{language === 'en' ? 'Server Error' : 'Ошибка сервера'}</p>
    </div>
  );
}

export default ServerError;
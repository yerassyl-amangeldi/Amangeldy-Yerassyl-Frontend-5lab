import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Unauthorized() {
  const { language } = useLanguage();
  return (
    <div className="page error">
      <h1>401</h1>
      <p>{language === 'en' ? 'Unauthorized' : 'Не авторизован'}</p>
    </div>
  );
}

export default Unauthorized;
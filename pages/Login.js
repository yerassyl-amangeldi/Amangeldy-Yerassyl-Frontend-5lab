import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(credentials);
    if (!success) {
      alert(language === 'en' ? 'Invalid credentials' : 'Неверные данные');
    }
  };

  return (
    <div className="page login">
      <h1>{language === 'en' ? 'Login' : 'Вход'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">{language === 'en' ? 'Sign In' : 'Войти'}</button>
      </form>
    </div>
  );
}

export default Login;
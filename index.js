import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles.css';
import { fetchProjects } from './redux/projectsSlice';
import { fetchTasks } from './redux/tasksSlice';

function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Root />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import tasksReducer from './tasksSlice';

export default configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});
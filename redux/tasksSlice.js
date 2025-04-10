import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksData from '../data/tasks.json';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return new Promise((resolve) => setTimeout(() => resolve(tasksData), 1000));
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load tasks';
      });
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
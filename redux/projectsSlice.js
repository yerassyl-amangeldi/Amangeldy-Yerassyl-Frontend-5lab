import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectsData from '../data/projects.json';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  return new Promise((resolve) => setTimeout(() => resolve(projectsData), 1000));
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load projects';
      });
  },
});

export default projectsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const tasklice = createSlice({
  name: 'tasks',
  initialState: {
    task: {},
    tasks: [],
  },
  reducers: {
    setCreateTask: (state, action) => {
      const { task } = action.payload;
      state.task = task;
      state.tasks.push(task);
    },
    setUpdateTaskBoard: (state, action) => {
      const { task } = action.payload;
      state.task = task;
      state.tasks.push(task);
    },
    setDeleteTask: (state, action) => {
      const { taskId } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    setGetTasksByProject: (state, action) => {
      const { tasks } = action.payload;
      state.tasks = [...tasks];
    }
  },
});

export const { setCreateTask, setUpdateTaskBoard, setDeleteTask } = tasklice.actions;
export default tasklice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const experienceSlice = createSlice({
  name: 'experience',
  initialState: {
    experiences: [],
  },
  reducers: {
    setAddExperience: (state, action) => {
      const { newExperience } = action.payload;
      state.experiences.push(newExperience);
    },
    setGetExperiences: (state, action) => {
      const { experiences } = action.payload;
      state.experiences = [...experiences];
    },
    setRemoveExperience: (state, action) => {
      const { id } = action.payload;
      state.experiences = state.experiences.filter((exp) => exp._id !== id);
    },
  },
});

export const { setAddExperience, setGetExperiences, setRemoveExperience } =
  experienceSlice.actions;
export default experienceSlice.reducer;

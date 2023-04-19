import { createSlice } from '@reduxjs/toolkit';

const experienceSlice = createSlice({
  name: 'experience',
  initialState: {
    experience: {},
    experiences: [],
  },
  reducers: {
    setAddExperience: (state, action) => {
      const { experience } = action.payload;
      state.experience = experience;
    },
    setGetExperiences: (state, action) => {
      const { experiences } = action.payload;
      state.experiences = experiences;
    },
    setRemoveExperiences: (state, action) => {
      const { experience } = action.payload;
      state.experience = experience;
    },
  },
});

export const { setAddExperience, setGetExperiences, setRemoveExperiences } =
  experienceSlice.actions;
export default experienceSlice.reducer;

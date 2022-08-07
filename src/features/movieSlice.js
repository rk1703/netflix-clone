import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,

  reducers: {
    addMovie: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const { addMovie } = movieSlice.actions;
export const selectMovie = (state) => state.movie.movie;

export default movieSlice.reducer;

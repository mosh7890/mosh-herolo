import {ADD_MOVIE, REMOVE_MOVIE, EDIT_MOVIE, SORT_MOVIES} from "../constants/action-types";

export const addMovie = movie => ({type: ADD_MOVIE, payload: movie});
export const removeMovie = movie => ({type: REMOVE_MOVIE, payload: movie});
export const editMovie = movie => ({type: EDIT_MOVIE, payload: movie});
export const sortMovies = movie => ({type: EDIT_MOVIE, payload: movie});
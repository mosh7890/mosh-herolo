import {ADD_MOVIE, REMOVE_MOVIE, EDIT_MOVIE} from "../constants/action-types";

const initialState = {
    movies: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIE:
            return {...state, movies: [...state.movies, action.payload]};
        case REMOVE_MOVIE:
            return {...state, movies: state.movies.filter(movie => movie.imdbID !== action.payload.imdbID)};
        case EDIT_MOVIE:
            return {
                ...state, movies: state.movies.map(item => {
                    if (item.imdbID === action.payload.imdbID) {
                        return {...item, ...action.payload}
                    }
                    return item
                })
            };
        default:
            return state;
    }
};

export default rootReducer;
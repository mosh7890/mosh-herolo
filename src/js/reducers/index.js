import {ADD_MOVIE, REMOVE_MOVIE, EDIT_MOVIE} from "../constants/action-types";

const initialState = {
    movies: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIE:
            return {...state, movies: [...state.movies, action.payload]};
        case REMOVE_MOVIE:
            return {...state, movies: state.movies.filter(movie => movie.id !== action.payload.id)};
        case EDIT_MOVIE:
            return {
                ...state, movies: state.movies.map(item => {
                    if (item.id === action.payload.id) {
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
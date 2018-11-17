import React from "react";
import store from "../js/store";
import {addMovie, removeMovie, editMovie} from "../js/actions";

window.store = store;
window.addMovie = addMovie;
window.removeMovie = removeMovie;
window.editMovie = editMovie;
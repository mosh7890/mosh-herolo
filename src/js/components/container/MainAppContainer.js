import React, {Component} from "react";
import {addMovie, removeMovie} from "../../actions";
import MainGrid from "./MainGrid";
import {connect} from "react-redux";

const axios = require('axios');

const mapStateToProps = state => {
    return {movies: state.movies};
};

const mapDispatchToProps = dispatch => {
    return {
        addMovie: (movie) => dispatch(addMovie(movie)),
        removeMovie: (movie) => dispatch(removeMovie(movie))
    };
};


class MainAppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        let self = this;
        try {
            const res = await axios.get('https://www.omdbapi.com/?apikey=b8562389&type=movie&s=avengers');
            for (var i = 0; i < res.data.Search.length; i++) {
                self.addMovies(res.data.Search[i]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    addMovies(movie) {
        console.log(movie);
        this.props.addMovie(movie)
    }

    removeMovie(movie) {
        console.log(movie);
        this.props.removeMovie(movie)
    }

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-12">
                    <h2>Movies</h2>
                    <MainGrid/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAppContainer);
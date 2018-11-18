import React, {Component} from "react";
import {addMovie} from "../../actions";
import {movie_names} from "../../misc/movie_names"
import MainGrid from "./MainGrid";
import MyAppBar from "./MyAppBar";
import {connect} from "react-redux";

const axios = require('axios');

const mapStateToProps = state => {
    return {movies: state.movies};
};

const mapDispatchToProps = dispatch => {
    return {
        addMovie: (movie) => dispatch(addMovie(movie)),
    };
};

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        for (var i = 0; i < movie_names.length; i++) {
            let self = this;
            try {
                const res = await axios.get(`https://www.omdbapi.com/?apikey=b8562389&type=movie&t=${movie_names[i]}`);
                self.addMovies(res.data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    addMovies(movie) {
        this.props.addMovie(movie)
    }

    render() {
        return (
            <div>
                <MyAppBar/>
                <MainGrid/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
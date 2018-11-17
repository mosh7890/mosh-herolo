import React, {Component} from "react";
import {removeMovie} from "../../actions";
import MovieCard from "./MovieCard"
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {movies: state.movies};
};

const mapDispatchToProps = dispatch => {
    return {
        removeMovie: (movie) => dispatch(removeMovie(movie))
    };
};


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.removeMovie = this.removeMovie.bind(this)
    }

    removeMovie(movie) {
        console.log(movie);
        this.props.removeMovie(movie);
    }

    render() {
        return (
            <MovieCard
                {...this.props}
                removeMovie={this.removeMovie}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
import React, {Component} from "react";
import {movie_names} from "../../misc/movie_names"
import MainGrid from "./MainGrid";
import {addMovie} from "../../actions";
import {connect} from "react-redux";

const axios = require('axios');

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        for (let i = 0; i < movie_names.length; i++) {
            try {
                const res = await axios.get(`https://www.omdbapi.com/?apikey=b8562389&type=movie&t=${movie_names[i]}`);
                this.props.addMovie(res.data)
            } catch (error) {
                console.error(error);
            }
        }
    }

    render() {
        return (
            <div style={{backgroundColor: "black"}}>
                <MainGrid/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addMovie: (movie) => dispatch(addMovie(movie)),
});

export default connect(null, mapDispatchToProps)(AppContainer);
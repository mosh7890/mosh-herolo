import React, {Component} from "react";
import {removeMovie, editMovie, addMovie} from "../../actions";
import MovieCard from "./MovieCard"
import MainBottomNav from "./BottomNav"
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {movies: state.movies};
};

const mapDispatchToProps = dispatch => {
    return {
        removeMovie: (movie) => dispatch(removeMovie(movie)),
        editMovie: (movie) => dispatch(editMovie(movie)),
        addMovie: (movie) => dispatch(addMovie(movie)),
    };
};

class MainGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMovieModalIsOpen: false,
            addMovieModalIsOpen: false,
            removeConfirmDialogIsOpen: false,
            movie: null,
            title: '',
            year: '',
            runtime: '',
            genre: '',
            director: '',
            id: 1,
        };
        this.openEditMovieModal = this.openEditMovieModal.bind(this);
        this.closeEditMovieModal = this.closeEditMovieModal.bind(this);
        this.handleTextFieldTitle = this.handleTextFieldTitle.bind(this);
        this.handleTextFieldYear = this.handleTextFieldYear.bind(this);
        this.handleTextFieldRuntime = this.handleTextFieldRuntime.bind(this);
        this.handleTextFieldGenre = this.handleTextFieldGenre.bind(this);
        this.handleTextFieldDirector = this.handleTextFieldDirector.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
        this.openAddMovieModal = this.openAddMovieModal.bind(this);
        this.closeAddMovieModal = this.closeAddMovieModal.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.removeConfirmDialogClickOpen = this.removeConfirmDialogClickOpen.bind(this);
        this.removeConfirmDialogClose = this.removeConfirmDialogClose.bind(this);
    }

    removeMovie(movie) {
        this.props.removeMovie(movie);
        this.setState({movie: null});
        this.removeConfirmDialogClose();
    }

    openEditMovieModal(movie) {
        this.setState({editMovieModalIsOpen: true, movie: movie});
    }

    closeEditMovieModal() {
        this.setState({
            editMovieModalIsOpen: false,
            movie: null,
            title: '',
            year: '',
            runtime: '',
            genre: '',
            director: ''
        });
    }

    handleTextFieldTitle(e) {
        this.setState({title: e.target.value});
    }

    handleTextFieldYear(e) {
        this.setState({year: e.target.value});
    }

    handleTextFieldRuntime(e) {
        this.setState({runtime: e.target.value});
    }

    handleTextFieldGenre(e) {
        this.setState({genre: e.target.value});
    }

    handleTextFieldDirector(e) {
        this.setState({director: e.target.value});
    }

    editMovie(movie) {
        let editedMovie = movie;
        editedMovie.Title = this.state.title;
        editedMovie.Year = this.state.year;
        editedMovie.Runtime = this.state.runtime;
        editedMovie.Genre = this.state.genre;
        editedMovie.Director = this.state.director;
        this.props.editMovie(editedMovie);
        this.closeEditMovieModal();
    }

    openAddMovieModal() {
        this.setState({addMovieModalIsOpen: true, movie: {}});
    }

    closeAddMovieModal() {
        this.setState({
            addMovieModalIsOpen: false,
            movie: null,
            title: '',
            year: '',
            runtime: '',
            genre: '',
            director: ''
        });
    }

    addMovie(movie) {
        let addedMovie = movie;
        addedMovie.Title = this.state.title;
        addedMovie.Year = this.state.year;
        addedMovie.Runtime = this.state.runtime;
        addedMovie.Genre = this.state.genre;
        addedMovie.Director = this.state.director;
        addedMovie.imdbID = this.state.id;
        addedMovie.Poster = 'https://m.media-amazon.com/images/M/MV5BMTYzNDc5NzY5OF5BMl5BanBnXkFtZTgwMjA0OTUzNjM@._V1_SX300.jpg';
        this.props.addMovie(addedMovie);
        this.setState({id: this.state.id++});
        this.closeAddMovieModal();
    }

    removeConfirmDialogClickOpen(movie) {
        this.setState({removeConfirmDialogIsOpen: true, movie: movie});
    };

    removeConfirmDialogClose() {
        this.setState({removeConfirmDialogIsOpen: false});
    };

    render() {
        return (
            <div>
                <MovieCard
                    {...this.props}
                    editMovieModalIsOpen={this.state.editMovieModalIsOpen}
                    openEditMovieModal={this.openEditMovieModal}
                    closeEditMovieModal={this.closeEditMovieModal}
                    movie={this.state.movie}
                    title={this.state.title}
                    runtime={this.state.runtime}
                    genre={this.state.genre}
                    director={this.state.director}
                    year={this.state.year}
                    handleTextFieldTitle={this.handleTextFieldTitle}
                    handleTextFieldYear={this.handleTextFieldYear}
                    handleTextFieldRuntime={this.handleTextFieldRuntime}
                    handleTextFieldGenre={this.handleTextFieldGenre}
                    handleTextFieldDirector={this.handleTextFieldDirector}
                    editMovie={this.editMovie}
                    removeMovie={this.removeMovie}
                    removeConfirmDialogIsOpen={this.state.removeConfirmDialogIsOpen}
                    removeConfirmDialogClickOpen={this.removeConfirmDialogClickOpen}
                    removeConfirmDialogClose={this.removeConfirmDialogClose}
                />
                <MainBottomNav
                    {...this.props}
                    addMovieModalIsOpen={this.state.addMovieModalIsOpen}
                    openAddMovieModal={this.openAddMovieModal}
                    closeAddMovieModal={this.closeAddMovieModal}
                    movie={this.state.movie}
                    title={this.state.title}
                    year={this.state.year}
                    runtime={this.state.runtime}
                    genre={this.state.genre}
                    director={this.state.director}
                    handleTextFieldTitle={this.handleTextFieldTitle}
                    handleTextFieldYear={this.handleTextFieldYear}
                    handleTextFieldRuntime={this.handleTextFieldRuntime}
                    handleTextFieldGenre={this.handleTextFieldGenre}
                    handleTextFieldDirector={this.handleTextFieldDirector}
                    addMovie={this.addMovie}
                />
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGrid);
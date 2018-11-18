import React, {Component} from "react";
import {removeMovie, editMovie, addMovie} from "../../actions";
import MovieCard from "./MovieCard"
import BottomNav from "./BottomNav"
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
            titleError: false,
            titleHelperText: 'Title',
            yearError: false,
            yearHelperText: 'Year',
            runtimeError: false,
            runtimeHelperText: 'Runtime',
            genreError: false,
            genreHelperText: 'Genre',
            directorError: false,
            directorHelperText: 'Director',
            sortUp: 'initial',
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
        this.sortMovies = this.sortMovies.bind(this);
    }

    removeMovie(movie) {
        this.props.removeMovie(movie);
        this.setState({movie: null});
        this.removeConfirmDialogClose();
    }

    openEditMovieModal(movie) {
        this.setState({
            editMovieModalIsOpen: true,
            movie: movie,
            title: movie.Title,
            year: movie.Year,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director,
            titleError: false,
            titleHelperText: 'Title',
            yearError: false,
            yearHelperText: 'Year',
            runtimeError: false,
            runtimeHelperText: 'Runtime',
            genreError: false,
            genreHelperText: 'Genre',
            directorError: false,
            directorHelperText: 'Director',
        });
    }

    closeEditMovieModal() {
        this.setState({
            editMovieModalIsOpen: false,
            movie: null,
            title: '',
            year: '',
            runtime: '',
            genre: '',
            director: '',
            titleError: false,
            titleHelperText: 'Title',
            yearError: false,
            yearHelperText: 'Year',
            runtimeError: false,
            runtimeHelperText: 'Runtime',
            genreError: false,
            genreHelperText: 'Genre',
            directorError: false,
            directorHelperText: 'Director',
        });
    }

    handleTextFieldTitle(e) {
        if (e.target.value.length <= 0) {
            this.setState({titleError: true, titleHelperText: 'Empty Field',});
        }
        else {
            this.setState({title: e.target.value, titleError: false, titleHelperText: 'Title',});
        }
        for (var i = 0; i < this.props.movies.length; i++) {
            if (this.props.movies[i].Title === e.target.value) {
                if (this.props.movies[i].Title !== this.state.movie.Title) {
                    this.setState({titleError: true, titleHelperText: 'Title already exists.',});
                    break;
                }
            }
        }
    }

    static isValidDate(d) {
        Date.prototype.valid = function () {
            return isFinite(this);
        };
        d = new Date(d);
        return d.valid();
    }

    handleTextFieldYear(e) {
        if (e.target.value.length <= 0) {
            this.setState({yearError: true, yearHelperText: 'Empty Field',});
        }
        else if (!MainGrid.isValidDate(e.target.value)) {
            this.setState({yearError: true, yearHelperText: 'Invalid Date',});
        }
        else {
            this.setState({year: e.target.value, yearError: false, yearHelperText: 'Year',});
        }
    }

    handleTextFieldRuntime(e) {
        if (e.target.value.length <= 0) {
            this.setState({runtimeError: true, runtimeHelperText: 'Empty Field',});
        }
        else {
            this.setState({runtime: e.target.value, runtimeError: false, runtimeHelperText: 'Runtime',});
        }
    }

    handleTextFieldGenre(e) {
        if (e.target.value.length <= 0) {
            this.setState({genreError: true, genreHelperText: 'Empty Field',});
        }
        else {
            this.setState({genre: e.target.value, genreError: false, genreHelperText: 'Genre',});
        }
    }

    handleTextFieldDirector(e) {
        if (e.target.value.length <= 0) {
            this.setState({directorError: true, directorHelperText: 'Empty Field',});
        }
        else {
            this.setState({director: e.target.value, directorError: false, directorHelperText: 'Director',});
        }
    }

    editMovie(movie) {
        if (!this.state.titleError
            && !this.state.yearError
            && !this.state.runtimeError
            && !this.state.genreError
            && !this.state.directorError) {
            let editedMovie = movie;
            let tempTitle = this.state.title.replace(/[^0-9A-Za-z ]/g, "");
            tempTitle = tempTitle.toLowerCase();
            tempTitle = MainGrid.toTitleCase(tempTitle);
            editedMovie.Title = tempTitle;
            editedMovie.Year = this.state.year;
            editedMovie.Runtime = this.state.runtime;
            editedMovie.Genre = this.state.genre;
            editedMovie.Director = this.state.director;
            this.props.editMovie(editedMovie);
            this.closeEditMovieModal();
        }
    }

    openAddMovieModal() {
        this.setState({
            addMovieModalIsOpen: true,
            movie: {},
            titleError: true,
            titleHelperText: 'Title',
            yearError: true,
            yearHelperText: 'Year',
            runtimeError: true,
            runtimeHelperText: 'Runtime',
            genreError: true,
            genreHelperText: 'Genre',
            directorError: true,
            directorHelperText: 'Director',
        });
    }

    closeAddMovieModal() {
        this.setState({
            addMovieModalIsOpen: false,
            movie: null,
            title: '',
            year: '',
            runtime: '',
            genre: '',
            director: '',
            titleError: false,
            titleHelperText: 'Title',
            yearError: false,
            yearHelperText: 'Year',
            runtimeError: false,
            runtimeHelperText: 'Runtime',
            genreError: false,
            genreHelperText: 'Genre',
            directorError: false,
            directorHelperText: 'Director',
        });
    }

    static toTitleCase(phrase) {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    addMovie(movie) {
        if (!this.state.titleError
            && !this.state.yearError
            && !this.state.runtimeError
            && !this.state.genreError
            && !this.state.directorError) {
            let addedMovie = movie;
            let tempTitle = this.state.title.replace(/[^0-9A-Za-z ]/g, "");
            tempTitle = tempTitle.toLowerCase();
            tempTitle = MainGrid.toTitleCase(tempTitle);
            addedMovie.Title = tempTitle;
            addedMovie.Year = this.state.year;
            addedMovie.Runtime = this.state.runtime;
            addedMovie.Genre = this.state.genre;
            addedMovie.Director = this.state.director;
            addedMovie.imdbID = this.state.id;
            addedMovie.Poster = 'https://m.media-amazon.com/images/M/MV5BMTYzNDc5NzY5OF5BMl5BanBnXkFtZTgwMjA0OTUzNjM@._V1_SX300.jpg';
            this.props.addMovie(addedMovie);
            this.setState({id: this.state.id + 1});
            this.closeAddMovieModal();
        }
    }

    removeConfirmDialogClickOpen(movie) {
        this.setState({removeConfirmDialogIsOpen: true, movie: movie});
    };

    removeConfirmDialogClose() {
        this.setState({removeConfirmDialogIsOpen: false});
    };

    sortMovies() {
        if (this.state.sortUp === 'initial') {
            this.setState({sortUp: true})
        }
        else if (this.state.sortUp === true) {
            this.setState({sortUp: false})
        }
        else if (this.state.sortUp === false) {
            this.setState({sortUp: true})
        }
    }

    render() {
        return (
            <div>
                <MovieCard
                    {...this.props}
                    editMovieModalIsOpen={this.state.editMovieModalIsOpen}
                    addMovieModalIsOpen={this.state.addMovieModalIsOpen}
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
                    titleError={this.state.titleError}
                    titleHelperText={this.state.titleHelperText}
                    yearError={this.state.yearError}
                    yearHelperText={this.state.yearHelperText}
                    runtimeError={this.state.runtimeError}
                    runtimeHelperText={this.state.runtimeHelperText}
                    genreError={this.state.genreError}
                    genreHelperText={this.state.genreHelperText}
                    directorError={this.state.directorError}
                    directorHelperText={this.state.directorHelperText}
                    editDisabled={this.state.editDisabled}
                    sortUp={this.state.sortUp}
                />
                <BottomNav
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
                    titleError={this.state.titleError}
                    titleHelperText={this.state.titleHelperText}
                    yearError={this.state.yearError}
                    yearHelperText={this.state.yearHelperText}
                    runtimeError={this.state.runtimeError}
                    runtimeHelperText={this.state.runtimeHelperText}
                    genreError={this.state.genreError}
                    genreHelperText={this.state.genreHelperText}
                    directorError={this.state.directorError}
                    directorHelperText={this.state.directorHelperText}
                    addDisabled={this.state.addDisabled}
                    sortMovies={this.sortMovies}
                />
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGrid);
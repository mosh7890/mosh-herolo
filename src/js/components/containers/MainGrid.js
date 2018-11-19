import React, {Component} from "react";
import {removeMovie, editMovie, addMovie} from "../../actions";
import AppBar_Main from "../appbars/AppBar_Main";
import Card_Movie from "../cards/Card_Movie"
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
        let title = e.target.value.toLowerCase();
        if (title.length <= 0) {
            this.setState({titleError: true, titleHelperText: 'Empty Field',});
        }
        else if (this.state.titleError === true) {
            this.setState({title: title, titleError: false, titleHelperText: 'Title',});
        }
        else {
            this.setState({title: title,});
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
        let year = e.target.value;
        if (year.length <= 0) {
            this.setState({yearError: true, yearHelperText: 'Empty Field',});
        }
        else if (!MainGrid.isValidDate(year)) {
            this.setState({yearError: true, yearHelperText: 'Invalid Date',});
        }
        else if (this.state.yearError === true) {
            this.setState({year: year, yearError: false, yearHelperText: 'Year',});
        }
        else {
            this.setState({year: year,});
        }
    }

    handleTextFieldRuntime(e) {
        let runtime = e.target.value;
        if (runtime <= 0) {
            this.setState({runtimeError: true, runtimeHelperText: 'Empty Field',});
        }
        else if (this.state.runtimeError === true) {
            this.setState({runtime: runtime, runtimeError: false, runtimeHelperText: 'Runtime',});
        }
        else {
            this.setState({runtime: runtime,});
        }
    }

    handleTextFieldGenre(e) {
        let genre = e.target.value;
        if (genre <= 0) {
            this.setState({genreError: true, genreHelperText: 'Empty Field',});
        }
        else if (this.state.genreError === true) {
            this.setState({genre: genre, genreError: false, genreHelperText: 'Genre',});
        }
        else {
            this.setState({genre: genre,});
        }
    }

    handleTextFieldDirector(e) {
        let director = e.target.value;
        if (director <= 0) {
            this.setState({directorError: true, directorHelperText: 'Empty Field',});
        }
        else if (this.state.directorError === true) {
            this.setState({director: director, directorError: false, directorHelperText: 'Director',});
        }
        else {
            this.setState({director: director,});
        }
    }

    editMovie(movie) {
        let tempTitle = this.state.title.replace(/[^0-9A-Za-z ]/g, "");
        tempTitle = tempTitle.toLowerCase();
        tempTitle = MainGrid.toTitleCase(tempTitle);
        for (let i = 0; i < this.props.movies.length; i++) {
            if (this.props.movies[i].Title === tempTitle) {
                if (this.props.movies[i].Title !== this.state.movie.Title) {
                    this.setState({title: tempTitle, titleError: true, titleHelperText: 'Title already exists.',});
                    return null;
                }
            }
        }
        if (!this.state.titleError
            && !this.state.yearError
            && !this.state.runtimeError
            && !this.state.genreError
            && !this.state.directorError) {
            let editedMovie = movie;
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
        let tempTitle = this.state.title.replace(/[^0-9A-Za-z ]/g, "");
        tempTitle = tempTitle.toLowerCase();
        tempTitle = MainGrid.toTitleCase(tempTitle);
        for (let i = 0; i < this.props.movies.length; i++) {
            if (this.props.movies[i].Title === tempTitle) {
                this.setState({title: tempTitle, titleError: true, titleHelperText: 'Title already exists.',});
                return null;
            }
        }
        if (!this.state.titleError
            && !this.state.yearError
            && !this.state.runtimeError
            && !this.state.genreError
            && !this.state.directorError) {
            let addedMovie = movie;
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
                <AppBar_Main
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
                    sortMovies={this.sortMovies}
                />
                <Card_Movie
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
                    sortUp={this.state.sortUp}
                />
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGrid);
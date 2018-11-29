import React, {Component} from "react";
import Modal_Movie from '../modals/Modal_Movie';
import AppBar_Main from "../appbars/AppBar_Main";
import Card_Movie from "../cards/Card_Movie"
import {removeMovie, editMovie, addMovie} from "../../actions";
import {connect} from "react-redux";

class MainGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortUp: 'initial',
            movie: null,
            movieModalIsOpen: false,
            modalType: null,
            removeConfirmDialogIsOpen: false,
            id: 1,
        };
        this.sortMovies = this.sortMovies.bind(this);
        this.openMovieModal = this.openMovieModal.bind(this);
        this.closeMovieModal = this.closeMovieModal.bind(this);
        this.movieAction = this.movieAction.bind(this);
        this.removeConfirmDialogClickOpen = this.removeConfirmDialogClickOpen.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
        this.removeConfirmDialogClose = this.removeConfirmDialogClose.bind(this);
    }

    sortMovies() {
        if (this.state.sortUp === 'initial') {
            this.setState({sortUp: true})
        } else if (this.state.sortUp === true) {
            this.setState({sortUp: false})
        } else if (this.state.sortUp === false) {
            this.setState({sortUp: true})
        }
    }

    openMovieModal(modalType, movie = {}) {
        this.setState({
            movie: movie,
            movieModalIsOpen: true,
            modalType: modalType,
        });
    }

    closeMovieModal() {
        this.setState({
            movie: null,
            movieModalIsOpen: false,
            modalType: null,
        });
    }

    movieAction(modalType, movie) {
        if (modalType === 'Add') {
            movie.imdbID = this.state.id;
            movie.Poster = 'https://m.media-amazon.com/images/M/MV5BMTYzNDc5NzY5OF5BMl5BanBnXkFtZTgwMjA0OTUzNjM@._V1_SX300.jpg';
            this.props.addMovie(movie);
            this.setState({id: this.state.id + 1});
        } else if (modalType === 'Edit') {
            movie.imdbID = this.state.movie.imdbID;
            movie.Poster = this.state.movie.Poster;
            this.props.editMovie(movie);
        }
        this.closeMovieModal();
    }

    removeConfirmDialogClickOpen(movie) {
        this.setState({removeConfirmDialogIsOpen: true, movie: movie});
    };


    removeMovie(movie) {
        this.props.removeMovie(movie);
        this.setState({movie: null});
        this.removeConfirmDialogClose();
    }

    removeConfirmDialogClose() {
        this.setState({removeConfirmDialogIsOpen: false});
    };

    render() {
        return (
            <div>
                <Modal_Movie
                    {...this.props}
                    movie={this.state.movie}
                    movieModalIsOpen={this.state.movieModalIsOpen}
                    modalType={this.state.modalType}
                    closeMovieModal={this.closeMovieModal}
                    movieAction={this.movieAction}
                />
                <AppBar_Main
                    sortMovies={this.sortMovies}
                    openMovieModal={this.openMovieModal}
                />
                <Card_Movie
                    {...this.props}
                    sortUp={this.state.sortUp}
                    movie={this.state.movie}
                    movieModalIsOpen={this.state.movieModalIsOpen}
                    removeConfirmDialogIsOpen={this.state.removeConfirmDialogIsOpen}
                    openMovieModal={this.openMovieModal}
                    removeConfirmDialogClickOpen={this.removeConfirmDialogClickOpen}
                    removeConfirmDialogClose={this.removeConfirmDialogClose}
                    removeMovie={this.removeMovie}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    movies: state.movies
});

const mapDispatchToProps = dispatch => ({
    removeMovie: (movie) => dispatch(removeMovie(movie)),
    editMovie: (movie) => dispatch(editMovie(movie)),
    addMovie: (movie) => dispatch(addMovie(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainGrid);
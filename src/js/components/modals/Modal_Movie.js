import React, {Component} from "react";
import Modal from '@material-ui/core/Modal';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/TextField';
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    }
});

const initialState = {
    stop: false,
};

class Modal_Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {...initialState};
        this.handleTextFieldTitle = this.handleTextFieldTitle.bind(this);
        this.handleTextFieldYear = this.handleTextFieldYear.bind(this);
        this.handleTextFieldRuntime = this.handleTextFieldRuntime.bind(this);
        this.handleTextFieldGenre = this.handleTextFieldGenre.bind(this);
        this.handleTextFieldDirector = this.handleTextFieldDirector.bind(this);
        this.handleAllFields = this.handleAllFields.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.modalType === 'Add' && !this.state.stop) {
            this.setState({
                title: '',
                year: '',
                runtime: '',
                genre: '',
                director: '',
                titleHelperText: 'Title - Empty Field',
                yearHelperText: 'Year - Empty Field',
                runtimeHelperText: 'Runtime - Empty Field',
                genreHelperText: 'Genre - Empty Field',
                directorHelperText: 'Director - Empty Field',
                titleError: true,
                yearError: true,
                runtimeError: true,
                genreError: true,
                directorError: true,
                stop: true,
            });
        } else if (this.props.modalType === 'Edit' && this.props.movie && !this.state.stop) {
            this.setState({
                title: this.props.movie.Title,
                year: this.props.movie.Year,
                runtime: this.props.movie.Runtime,
                genre: this.props.movie.Genre,
                director: this.props.movie.Director,
                titleHelperText: 'Title',
                yearHelperText: 'Year',
                runtimeHelperText: 'Runtime',
                genreHelperText: 'Genre',
                directorHelperText: 'Director',
                titleError: false,
                yearError: false,
                runtimeError: false,
                genreError: false,
                directorError: false,
                stop: true,
            });
        }
    }

    handleTextFieldTitle(e) {
        let title = e.target.value.toLowerCase();
        if (title.length <= 0) {
            this.setState({titleError: true, titleHelperText: 'Title - Empty Field',});
        } else if (this.state.titleError === true) {
            this.setState({title: title, titleError: false, titleHelperText: 'Title',});
        } else {
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
            this.setState({yearError: true, yearHelperText: 'Year - Empty Field',});
        } else if (!Modal_Movie.isValidDate(year)) {
            this.setState({yearError: true, yearHelperText: 'Year - Invalid Date',});
        } else if (this.state.yearError === true) {
            this.setState({year: year, yearError: false, yearHelperText: 'Year',});
        } else {
            this.setState({year: year,});
        }
    }

    handleTextFieldRuntime(e) {
        let runtime = e.target.value;
        if (runtime <= 0) {
            this.setState({runtimeError: true, runtimeHelperText: 'Runetime - Empty Field',});
        } else if (this.state.runtimeError === true) {
            this.setState({runtime: runtime, runtimeError: false, runtimeHelperText: 'Runtime',});
        } else {
            this.setState({runtime: runtime,});
        }
    }

    handleTextFieldGenre(e) {
        let genre = e.target.value;
        if (genre <= 0) {
            this.setState({genreError: true, genreHelperText: 'Genre - Empty Field',});
        } else if (this.state.genreError === true) {
            this.setState({genre: genre, genreError: false, genreHelperText: 'Genre',});
        } else {
            this.setState({genre: genre,});
        }
    }

    handleTextFieldDirector(e) {
        let director = e.target.value;
        if (director <= 0) {
            console.log(this.state.directorError);
            this.setState({directorError: true, directorHelperText: 'Director - Empty Field',});
        } else if (this.state.directorError === true) {
            this.setState({director: director, directorError: false, directorHelperText: 'Director',});
        } else {
            this.setState({director: director,});
        }
    }

    static toTitleCase(phrase) {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    handleAllFields() {
        let tempTitle = this.state.title.replace(/[^0-9A-Za-z ]/g, "");
        tempTitle = tempTitle.toLowerCase();
        tempTitle = Modal_Movie.toTitleCase(tempTitle);
        for (let i = 0; i < this.props.movies.length; i++) {
            if (this.props.movies[i].Title === tempTitle) {
                this.setState({title: tempTitle, titleError: true, titleHelperText: 'Title - Already exists.',});
                return null;
            }
        }
        if (!this.state.titleError
            && !this.state.yearError
            && !this.state.runtimeError
            && !this.state.genreError
            && !this.state.directorError) {
            let movie = {
                Title: tempTitle,
                Year: this.state.year,
                Runtime: this.state.runtime,
                Genre: this.state.genre,
                Director: this.state.director,
            };
            this.props.movieAction(this.props.modalType, movie);
            this.setState({...initialState});
        }
    }

    handleCancel() {
        this.props.closeMovieModal();
        this.setState({...initialState});
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.props.movie ? <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.movieModalIsOpen}
                    onClose={this.handleCancel}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography variant="h6">
                                {this.props.modalType} Movie
                            </Typography>
                        </CardContent>
                        <form style={{textAlign: 'center'}}>
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Title}
                                className={classes.input}
                                onChange={this.handleTextFieldTitle}
                                helperText={this.state.titleHelperText}
                                error={this.state.titleError}
                            />
                            < Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Year}
                                className={classes.input}
                                onChange={this.handleTextFieldYear}
                                helperText={this.state.yearHelperText}
                                error={this.state.yearError}
                            />
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Runtime}
                                className={classes.input}
                                onChange={this.handleTextFieldRuntime}
                                helperText={this.state.runtimeHelperText}
                                error={this.state.runtimeError}/>
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Genre}
                                className={classes.input}
                                onChange={this.handleTextFieldGenre}
                                helperText={this.state.genreHelperText}
                                error={this.state.genreError}/>
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Director}
                                className={classes.input}
                                onChange={this.handleTextFieldDirector}
                                helperText={this.state.directorHelperText}
                                error={this.state.directorError}/>
                        </form>
                        <DialogActions style={{justifyContent: 'center'}}>
                            <Button size="small" color="primary"
                                    onClick={this.handleAllFields}>
                                {this.props.modalType}
                            </Button>
                            <Button size="small" color="primary"
                                    onClick={this.handleCancel}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </div>
                </Modal> : null}
            </div>
        )
    }
}

Modal_Movie = withStyles(styles)(Modal_Movie);

export default Modal_Movie;


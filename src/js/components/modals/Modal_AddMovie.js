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

class Modal_AddMovie extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.addMovieModalIsOpen}
                    onClose={() => this.props.closeAddMovieModal()}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography variant="h6">
                                Add Movie
                            </Typography>
                        </CardContent>
                        {this.props.movie ? <form style={{textAlign: 'center'}}>
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Title}
                                className={classes.input}
                                onChange={this.props.handleTextFieldTitle}
                                helperText={this.props.titleHelperText}
                                error={this.props.titleError}
                            />
                            < Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Year}
                                className={classes.input}
                                onChange={this.props.handleTextFieldYear}
                                helperText={this.props.yearHelperText}
                                error={this.props.yearError}
                            />
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Runtime}
                                className={classes.input}
                                onChange={this.props.handleTextFieldRuntime}
                                helperText={this.props.runtimeHelperText}
                                error={this.props.runtimeError}/>
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Genre}
                                className={classes.input}
                                onChange={this.props.handleTextFieldGenre}
                                helperText={this.props.genreHelperText}
                                error={this.props.genreError}/>
                            <Input
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.props.movie.Director}
                                className={classes.input}
                                onChange={this.props.handleTextFieldDirector}
                                helperText={this.props.directorHelperText}
                                error={this.props.directorError}/>
                        </form> : null}
                        <DialogActions style={{justifyContent: 'center'}}>
                            <Button size="small" color="primary"
                                    onClick={() => this.props.addMovie(this.props.movie)}>
                                Add
                            </Button>
                            <Button size="small" color="primary"
                                    onClick={() => this.props.closeAddMovieModal()}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </div>
                </Modal>
            </div>
        )
    }
}

Modal_AddMovie = withStyles(styles)(Modal_AddMovie);

export default Modal_AddMovie;


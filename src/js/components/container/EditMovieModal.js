import React, {Component} from "react";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/TextField';
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

class EditMovieModal extends Component {
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
                    open={this.props.editMovieModalIsOpen}
                    onClose={() => this.props.closeEditMovieModal()}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography component="p">
                            Edit Movie
                        </Typography>
                        {this.props.movie ? <form className={classes.container}>
                            <Input
                                required={true}
                                defaultValue={this.props.movie.Title}
                                className={classes.input}
                                onChange={this.props.handleTextFieldTitle}
                                helperText={this.props.titleHelperText}
                                error={this.props.titleError}
                            />
                            < Input
                                required={true}
                                defaultValue={this.props.movie.Year}
                                className={classes.input}
                                onChange={this.props.handleTextFieldYear}
                                helperText={this.props.yearHelperText}
                                error={this.props.yearError}
                            />
                            <Input
                                required={true}
                                defaultValue={this.props.movie.Runtime}
                                className={classes.input}
                                onChange={this.props.handleTextFieldRuntime}
                                helperText={this.props.runtimeHelperText}
                                error={this.props.runtimeError}/>
                            <Input
                                required={true}
                                defaultValue={this.props.movie.Genre}
                                className={classes.input}
                                onChange={this.props.handleTextFieldGenre}
                                helperText={this.props.genreHelperText}
                                error={this.props.genreError}/>
                            <Input
                                required={true}
                                defaultValue={this.props.movie.Director}
                                className={classes.input}
                                onChange={this.props.handleTextFieldDirector}
                                helperText={this.props.directorHelperText}
                                error={this.props.directorError}/>
                        </form> : null}
                        <Button size="small" color="primary"
                                onClick={() => this.props.editMovie(this.props.movie)}>
                            Edit
                        </Button>
                        <Button size="small" color="primary"
                                onClick={() => this.props.closeEditMovieModal()}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

EditMovieModal = withStyles(styles)(EditMovieModal);

export default EditMovieModal;


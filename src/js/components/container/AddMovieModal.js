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

class AddMovieModal extends Component {
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
                    onClose={() => this.props.addEditMovieModal()}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography component="p">
                            Add Movie
                        </Typography>
                        <form className={classes.container}>
                            <Input
                                defaultValue=""
                                className={classes.input}
                                onChange={this.props.handleTextFieldTitle}
                                helperText="Title"
                            />
                            <Input
                                defaultValue=""
                                className={classes.input}
                                onChange={this.props.handleTextFieldYear}
                                helperText="Year"
                            />
                            <Input
                                defaultValue=""
                                className={classes.input}
                                onChange={this.props.handleTextFieldRuntime}
                                helperText="Runtime"
                            />
                            <Input
                                defaultValue=""
                                className={classes.input}
                                onChange={this.props.handleTextFieldGenre}
                                helperText="Genre"
                            />
                            <Input
                                defaultValue=""
                                className={classes.input}
                                onChange={this.props.handleTextFieldDirector}
                                helperText="Director"
                            />
                        </form>
                        <Button size="small" color="primary"
                                onClick={() => this.props.addMovie(this.props.movie)}>
                            Add
                        </Button>
                        <Button size="small" color="primary"
                                onClick={() => this.props.closeAddMovieModal()}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

AddMovieModal = withStyles(styles)(AddMovieModal);

export default AddMovieModal;


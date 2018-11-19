import React from "react";
import Modal_AddMovie from '../modals/Modal_AddMovie';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Sort from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';

export default (props) => {
    return (
        <div>
            <Modal_AddMovie
                {...props}
            />
            <div style={{flexGrow: 1}}>
                <AppBar position="fixed" color="default">
                    <Toolbar>
                        <Typography variant="headline" color="inherit" style={{flexGrow: 1}}>
                            Herolo Movies
                        </Typography>
                        <Button size="small" color="primary" onClick={() => props.openAddMovieModal()}>
                            <LibraryAdd/>
                            Add Movie
                        </Button>
                        <Button size="small" color="primary" onClick={() => props.sortMovies()}>
                            <Sort/>
                            Sort Movies
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
}
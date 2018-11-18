import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
    root: {
        flexGrow: 1,
        paddingBottom: "10px",
    },
    grow: {
        flexGrow: 1,
    },
    center: {
        margin: "auto",
    },
    rightAlign: {
        margin: "auto",
    },
};

function MyAppBar(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.center}>
                    <Typography variant="headline" color="inherit" className={classes.grow}>
                        Herolo Movies
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(MyAppBar);
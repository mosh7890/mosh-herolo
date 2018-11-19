import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
    return (
        <div>
            <Dialog
                open={props.removeConfirmDialogIsOpen}
                onClose={() => props.removeConfirmDialogClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Movie?"}</DialogTitle>
                <DialogActions style={{justifyContent: 'center'}}>
                    <Button onClick={() => props.removeConfirmDialogClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.removeMovie(props.movie)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

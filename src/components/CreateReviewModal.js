import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid } from '@material-ui/core';
import CreateReviewForm from './CreateReviewForm'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 720,
        backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (props.reviewed.includes(props.JobName)) {
        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    // startIcon={<GradeIcon />}
                    onClick={handleOpen}
                    size='small'
                    disabled
                >
                    Reviewed
                </Button>
            </div>
        );
    } else {
        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleOpen}
                    size='small'
                >
                    Review
                    </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <CreateReviewForm JobName={props.JobName} />
                    </div>
                </Modal>
            </div >
        );
    }


}

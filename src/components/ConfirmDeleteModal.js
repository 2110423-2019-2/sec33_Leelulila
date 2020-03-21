import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateBlogForm from './CreateBlogForm'

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
        width: 550,
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

    const onDelete = () =>{
        fetch("/blog/" + props.id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          }).then(window.location.reload(true))
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                variant='text'
                onClick={handleOpen}
                color='white'
            >
                Delete
                </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Do you want to delete this blog? Please confirm.</h2>
                    <Button variant='contained' color='secondary' onClick={onDelete}>Confirm</Button>
                    <Button variant='contained' color='primary' onClick={handleClose} style={{ marginLeft: '30px' }}>Cancel</Button>
                </div>
            </Modal>
        </div >
    );
}

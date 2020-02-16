import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function update() {
    console.log('change')
    let self = this;
    fetch("/user/101", {
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: {'education':'aaaaaaa'}
    }).then(function (data) {
        console.log('innnnnnn')
    }).catch(function (err) {
        console.log(err);
    });
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 500,
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
    const [value, setValue] = React.useState('before');

    const handleChange = () => {
        update();
        console.log('upppppp')
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <button type="button" onClick={handleOpen}>
                Edit
      </button> */}
            <Button variant='contained' size='small' style={{ marginTop: '10px' }} onClick={handleOpen} color='grey' >Edit</Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">{props.title}</h2>
                    <p id="simple-modal-description">
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                id="standard-multiline-flexible"
                                multiline
                                rowsMax="10"
                                value={value}
                                onChange={handleChange}
                            />
                        </form>
                    </p>
                    <button style={{ float: "right" }} type="button" onClick={handleChange}>
                        Save
         </button>
                    <button style={{ float: "right" }} type="button" onClick={handleClose}>
                        Discard
         </button>
                </div>
            </Modal>
        </div>
    );
}

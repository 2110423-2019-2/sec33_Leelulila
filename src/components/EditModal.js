import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Profile from '../pages/Profile';

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
    const [value, setValue] = React.useState(props.value);
    const [value0, setValue0] = React.useState(props.value[0]);
    const [value1, setValue1] = React.useState(props.value[1]);
    const [value2, setValue2] = React.useState(props.value[2]);

    const handleChange = (event) => {
        setValue(event.target.value)
        setValue0(event.target.value1)
        setValue1(event.target.value1)
        setValue2(event.target.value2)
    };

    const handlesave = () => {
        if (props.many == true) {
            var v0 = document.getElementById(props.title[0]).value;
            var v1 = document.getElementById(props.title[1]).value;
            var v2 = document.getElementById(props.title[2]).value;
            var data = {}
            for (k in props.title){
                var key = props.title[k].toLowerCase()
                key = key.replace(/\s+/g, '');
                data[key] = document.getElementById(props.title[k]).value;
            }            
            console.log(data)
            let self = this;
            fetch("/user/101", {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function (response) {
                window.location.reload()
            }).catch(function (err) {
                console.log(err);
            });
            console.log('upppppp')
            setOpen(false);
        }
        var v = document.getElementById(props.title).value;
        var data = {}
        var k = props.title.toLowerCase()
        data[k] = v
        console.log(data)
        let self = this;
        fetch("/user/101", {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            window.location.reload()
        }).catch(function (err) {
            console.log(err);
        });
        console.log('upppppp')
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (props.many == true) {
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
                        <p id="demo"></p>

                        <h2 id="simple-modal-title">{props.title[0]}</h2>
                        <p id="simple-modal-description">
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    id={props.title[0]}
                                    multiline
                                    rowsMax="10"
                                    value={value0}
                                    onChange={(e) => handleChange(e)}
                                />
                            </form>
                        </p>
                        <h2 id="simple-modal-title">{props.title[1]}</h2>
                        <p id="simple-modal-description">
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    id={props.title[1]}
                                    multiline
                                    rowsMax="10"
                                    value={value1}
                                    onChange={(e) => handleChange(e)}
                                />
                            </form>
                        </p>
                        <h2 id="simple-modal-title">{props.title[2]}</h2>
                        <p id="simple-modal-description">
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    id={props.title[2]}
                                    multiline
                                    rowsMax="10"
                                    value={value2}
                                    onChange={(e) => handleChange(e)}
                                />
                            </form>
                        </p>
                        <button style={{ float: "right" }} type="button" onClick={handlesave}>
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
                                id={props.title}
                                multiline
                                rowsMax="10"
                                value={value}
                                onChange={handleChange}
                            />
                        </form>
                    </p>
                    <button style={{ float: "right" }} type="button" onClick={handlesave}>
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

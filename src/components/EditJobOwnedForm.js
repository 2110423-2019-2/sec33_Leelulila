import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Profile from '../pages/Profile';
import DatePicker from '../components/DatePicker';

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
    
    const [detail, setDetail] = React.useState(props.detail);
    const [wages, setWages] = React.useState(props.wages);
    const [location, setLocation] = React.useState(props.location);
    const [workDate, setWorkDate] = React.useState(props.workDate);
    const [timeBegin, setTimeBegin] = React.useState(props.timeBegin);
    const [timeEnd, setTimeEnd] = React.useState(props.timeEnd);
    console.log(detail)

    // const handleChange = (event) => {
    //     console.log(event)
    //     setDetail(event.target.value)
    //     // setWages(event.target.wages)
    //     // setLocation(event.target.location)
    //     // setWorkDate(event.target.workDate)
    //     // setTimeBegin(event.target.timeBegin)
    //     // setTimeEnd(event.target.timeEnd)

    // };

    const handlesave = () => {
            var data = {}        
            var a = document.getElementById("detail").value;
            var b = document.getElementById("wages").value;
            var c = document.getElementById("location").value;
            var d = document.getElementById("workDate").value;
            var e = document.getElementById("timeBegin").value;
            var f = document.getElementById("timeEnd").value;
            // var k1 = .toLowerCase()
            // var k2 = props.wages.toLowerCase()
            // var k3 = props.location.toLowerCase()
            // var k4 = props.workDate.toLowerCase()
            // var k5 = props.timeBegin.toLowerCase()
            // var k6 = props.timeEnd.toLowerCase()
            data["detail"] = a
            data["wages"] = b
            data["location"] = c
            data["workDate"] = d
            data["timeBegin"] = e
            data["timeEnd"] = f
            let self = this;   
            fetch("/user/"+props._id, {
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
        console.log("vaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(props.value)
        //console.log(props.value[0])
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
            <Button variant='contained' size='small' style={{ height: '40px', marginTop: '20%', marginRight: '20px' }} onClick={handleOpen} color='grey' >Edit</Button>

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
                        <h3>Information:</h3>
                            <TextField
                                label='Edit Detail'
                                id="detail"
                                multiline
                                rowsMax="10"
                                defaultValue={detail}
                                // onChange={()handleChange}
                            />
                            <TextField
                                label='Edit Wages'
                                id="wages"
                                multiline
                                rowsMax="10"
                                defaultValue={wages}
                                // onChange={handleChange}
                            />
                            <TextField
                                label='Edit location'
                                id="location"
                                multiline
                                rowsMax="10"
                                defaultValue={location}
                                // onChange={handleChange}
                            />
                            <h3>Date and Time:</h3>
                                <DatePicker
                                    id='workDate'
                                    label="Edit Work Date"
                                    type='date'
                                    defaultValue={workDate}

                            />
                            <DatePicker
                                    id='timeBegin'
                                    label="Edit Start time"
                                    type='time'
                                    // value={this.state.selectedBegintime}
                                    // onChange={this.handleBeginTimeChange}
                                    defaultValue={timeBegin}
                            />
                            <DatePicker
                                    id='timeEnd'
                                    label="Edit End time"
                                    type='time'
                                    // value={this.state.selectedEndtime}
                                    // onChange={this.handleEndTimeChange}
                                    defaultValue={timeEnd}
                            />
                        </form>
                    </p>
                    <button style={{ float: "right" }}  onClick={handlesave}>
                        Save
         </button>
                    <button style={{ float: "right" }}  onClick={handleClose}>
                        Discard
         </button>
                </div>
            </Modal>
        </div>

    );
}
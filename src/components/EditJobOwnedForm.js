import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Profile from '../pages/Profile';
import DatePicker from '../components/DatePicker';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import CryptoJS from "crypto-js";

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

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
      
    />
  ));
  
  const StyledMenuItem = withStyles(theme => ({
  
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(props.Value);
    
    const [Detail, setDetail] = React.useState(props.Detail);
    const [Wages, setWages] = React.useState(props.Wages);
    const [Location, setLocation] = React.useState(props.Location);
    const [WorkDate, setWorkDate] = React.useState(props.WorkDate);
    const [TimeBegin, setTimeBegin] = React.useState(props.TimeBegin);
    const [TimeEnd, setTimeEnd] = React.useState(props.TimeEnd);
    const [WorkKey, setWorkKey] = React.useState(props.WorkKey);
    console.log(props);

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
            var Detail = document.getElementById("Detail").value;
            var Wages = document.getElementById("Wages").value;
            var Location = document.getElementById("Location").value;
            var WorkDate = document.getElementById("WorkDate").value;
            var TimeBegin = document.getElementById("TimeBegin").value;
            var TimeEnd = document.getElementById("TimeEnd").value;
            data["JobDetail"] = Detail
            data["Wages"] = Wages
            data["Location"] = Location
            data["Date"] = WorkDate
            data["BeginTime"] = TimeBegin
            data["EndTime"] = TimeEnd
            let self = this;
            let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123456').toString();
            let sending_data = {data: ciphertext};
            fetch("/jobUpdate/"+WorkKey, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(sending_data)
            }).then(function (response) {
                console.log(response);
                window.location.reload()
            }).catch(function (err) {
                console.log(err);
            });
            setOpen(false);
    };

    const handleOpen = () => {
        console.log(props.value)
        //console.log(props.value[0])
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <StyledMenuItem>
            {/* <button type="button" onClick={handleOpen}>
                Edit
      </button> */}
            <ListItemText primary="Edit" onClick={handleOpen} />

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
                                id="Detail"
                                multiline
                                rowsMax="10"
                                defaultValue={Detail}
                                // onChange={()handleChange}
                            />
                            <TextField
                                label='Edit Wages'
                                id="Wages"
                                multiline
                                rowsMax="10"
                                defaultValue={Wages}
                                // onChange={handleChange}
                            />
                            <TextField
                                label='Edit location'
                                id="Location"
                                multiline
                                rowsMax="10"
                                defaultValue={Location}
                                // onChange={handleChange}
                            />
                            <h3>Date and Time:</h3>
                                <DatePicker
                                    id='WorkDate'
                                    label="Edit Work Date"
                                    type='date'
                                    defaultValue={WorkDate}

                            />
                            <DatePicker
                                    id='TimeBegin'
                                    label="Edit Start time"
                                    type='time'
                                    // value={this.state.selectedBegintime}
                                    // onChange={this.handleBeginTimeChange}
                                    defaultValue={TimeBegin}
                            />
                            <DatePicker
                                    id='TimeEnd'
                                    label="Edit End time"
                                    type='time'
                                    // value={this.state.selectedEndtime}
                                    // onChange={this.handleEndTimeChange}
                                    defaultValue={TimeEnd}
                            />
                        </form>
                    </p>
                    <button style={{ float: "right" }} type="button" onClick={handlesave}>
                        Save
         </button>
                    <button style={{ float: "right" }} type="button" onClick={handleClose} style={{ marginLeft: '320px' }}>
                        Discard
         </button>
                </div>
            </Modal>
        </StyledMenuItem>

    );
}
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import EmployeeListModal from './EmployeeListModal';
import AcceptedEmployeeListModal from './AcceptedEmployeeListModal';
import EditJobOwnedForm from './EditJobOwnedForm';
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

function onDeletejob(WorkKey) {
    fetch("/job/" + WorkKey, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(window.location.reload(false))
    // window.location.reload(false);
  }

function onConfirm(WorkKey){

    var data = { Status: 'Confirm' };

    fetch("/jobstatus/" + WorkKey, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(window.location.reload(false));
  }



export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log(props.WorkKey);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="red"
        onClick={handleClick}
      >
        Action
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Delete" onClick={() => onDeletejob(props.WorkKey)}/>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Start" onClick={() => onConfirm(props.WorkKey)} />
        </StyledMenuItem>
        <EmployeeListModal WorkKey={props.WorkKey}/>
        <AcceptedEmployeeListModal WorkKey={props.WorkKey}/>
        {console.log(props.WorkKey[0])};
        <EditJobOwnedForm _id = {props._id} Wages={props.Wages} Detail={props.JobDetail} Location={props.Location} WorkDate={props.Date} TimeBegin={props.BeginTime} TimeEnd={props.EndTime} WorkKey={props.WorkKey[0]}/>
      </StyledMenu>
    </div>
  );
}
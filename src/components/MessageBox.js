import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MailIcon from '@material-ui/icons/Mail';
import { blue } from '@material-ui/core/colors';
import CreateReviewModal from '../components/CreateReviewModal'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, notifications, open } = props;

  const handleClose = () => {
    onClose();
  };
  // "Received "+noti.wage+"฿ from "+noti.email+ " at "+ new Date(noti.timestamp).toLocaleString()

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Message Box</DialogTitle>
      <List>
        {notifications.slice(0).reverse().map(noti => (
          <ListItem button key={noti}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {noti.status != 0 && <MailIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={noti.string + " at " + new Date(noti.timestamp).toLocaleString()} />
            {noti.status == 2 && <CreateReviewModal JobName={noti.string.slice(7,-1)} />}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { InputLabel, InputBase, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export default function ResponsiveDialog() {
  
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleClickOpen} style={{ marginLeft: '10px' }}>Login</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Please enter your e-mail and password"}</DialogTitle>
        <DialogContent>
            <Grid item><TextField size="small" id="email" label="Email" variant="outlined" fullWidth /></Grid>
            <Grid item><TextField size="small" id="pass" label="Password" type='password' variant="outlined" style={{ marginTop: '10px' }} fullWidth /></Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
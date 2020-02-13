import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GenderRadio from '../components/GenderRadioButton';
import DatePicker from '../components/DatePicker';
import { useForm } from 'react-hook-form'
import fire from '../config/firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '20%'
  },
}));

export default function RegisterPage() {
  const classes = useStyles();

  const { register, handleSubmit } = useForm()

  const onSubmit = data => {

    var firebaseRef = fire.database().ref('User');
    var email = data.email;
    var pass = data.password;
    var confirmPass = data.confirmPassword;
    var name = data.firstName;
    var surname = data.lastName;

    if(email.includes('@') && pass.length >=6 && pass === confirmPass){ 

    // console.log('1');
    // var indexofat = email.indexOf('@');
    // var subemail = email.substring(0,indexofat);

    
    // firebaseRef.child(subemail).update({
    //   Name:name,
    //   Password:pass,
    //   Surname:surname,
    // });
    
    // var firebaseRefbyemail = fire.database().ref(subemail);
    // console.log('2');
    

    const auth = fire.auth();

    auth.createUserWithEmailAndPassword(email, pass)
   .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        alert("Registration failed!!");
        // ...
      });
    //if this line bug want happen next
    alert("Registration success");
    window.location.href = "http://localhost:3000/createjob";

    
  }else{
    alert("Please check your email format and password length must more than 6 character!! and make sure password equal to confirm password");
  }
  }

  return (
    <Container component="main" maxWidth="sm" style={{marginTop:"70px",minHeight:'520px',paddingBottom:'50px'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{marginTop:'5%'}}>
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputRef={register}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <GenderRadio inputRef={register}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <DatePicker 
                id = 'birthday'
                label = "Birthday"
                type = 'date'
                inputRef={register}/>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

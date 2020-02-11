import React from 'react';
<<<<<<< HEAD
import RegisterForm from '../components/RegisterForm';
import '../style.css';
import { Container } from '@material-ui/core';

const Register = () => {
    return (
        <div>
            <Container>
                <h1>Register for ACTTIME</h1>
                <RegisterForm/>
            </Container>
        </div>
    );
};

export default Register;
=======
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
import fire from '../config/firebase'

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
    var surname = document.getElementById('sname').value;

    if(email.includes('@') && pass.length >=6 && pass === confirmPass){ 

    console.log('1');
    var indexofat = email.indexOf('@');
    var subemail = email.substring(0,indexofat);

    
    firebaseRef.child(subemail).update({
      Name:name,
      Password:pass,
      Surname:surname,
      Currentjobcreated:'',
      Currentjob:'',
      Historyjob:'',
      Historyjobcreated:''
      

    });
    
    var firebaseRefbyemail = fire.database().ref(subemail);
    console.log('2');
    

    const auth = fire.auth();

    auth.createUserWithEmailAndPassword(document.getElementById('email').value,document.getElementById('pass').value)
    .then(
      fire.auth().signOut);
    //if this line bug want happen next
    alert("Registration Success!!");
    
    
    this.setState({
      Checkregister:true
    })

    
  }else{
    alert("Please check your email format and password length must more than 6 character!!");
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
                <DatePicker inputRef={register}/>
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
>>>>>>> 17ba52af2024826a0ad9cac585a524369a63736c

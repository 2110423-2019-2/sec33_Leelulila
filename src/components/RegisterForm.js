import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, InputBase, Button, Grid } from '@material-ui/core';
// import fire from '../config/Fire';
import '../style.css';
import { Redirect } from 'react-router-dom';

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    // this.insertData = this.insertData.bind(this);

    this.state = {
      Checkregister: false
    }

  }

  // insertData() {
  //   var firebaseRef = fire.database().ref('User');
  //   var email = document.getElementById('email').value;
  //   var pass = document.getElementById('pass').value;
  //   var name = document.getElementById('name').value;
  //   var surname = document.getElementById('sname').value;

  //   if(email.includes('@') && pass.length >=6){ 

  //   console.log('1');  
  //   var indexofat = email.indexOf('@');
  //   var subemail = email.substring(0,indexofat);


  //   firebaseRef.child(subemail).update({
  //     Name:name,
  //     Password:pass,
  //     Surname:surname,
  //     Currentjobcreated:'',
  //     Currentjob:'',
  //     Historyjob:'',
  //     Historyjobcreated:''


  //   });

  //   var firebaseRefbyemail = fire.database().ref(subemail);
  //   console.log('2');


  //   const auth = fire.auth();

  //   auth.createUserWithEmailAndPassword(document.getElementById('email').value,document.getElementById('pass').value)
  //   .then(
  //     fire.auth().signOut);
  //   //if this line bug want happen next
  //   alert("Registration Success!!");


  //   this.setState({
  //     Checkregister:true
  //   })


  // }else{
  //   alert("Please check your email format and password length must more than 6 character!!");
  // }

  // }





  // RegisterForm = () => {
  //     const classes = useStyles();



  // <form className={classes.root} noValidate autoComplete="off">
  render() {


    return (
      <form noValidate autoComplete="on" style={{ minHeight: "520px" }}>
        <div>
          <Grid container direction='column' xs={12} md={6} id="GridRegister" spacing={2}>
            <Grid item><h1>Register</h1></Grid>
            {/* <Grid item><TextField id="user" label="Username" /></Grid> */}
            <Grid item><TextField name="email" variant="outlined" color="primary" id="email" fullWidth label="Email" type="email" /></Grid>
            <Grid item><TextField name="password" variant="outlined" color="secondary" type='password' fullWidth id="pass" label="Password" /></Grid>
            {/* <Grid item><InputBase  type='date' id="standard" label="Date" style={{marginLeft:'10px',marginTop:'10px'}}/></Grid> */}
            <Grid item><TextField name="fname" variant="outlined" color="secondary" id="name" fullWidth label="Name" /></Grid>
            <Grid item><TextField name="sname" variant="outlined" color="secondary" id="sname" fullWidth label="Surname" /></Grid>
            <Button variant='contained' size='small' style={{ marginTop: '10px' }} color='primary'
              onClick={this.insertData} >Submit</Button>
          </Grid>
        </div>
      </form>
    );



  }

  // };



}
export default RegisterForm;
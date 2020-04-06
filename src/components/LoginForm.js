import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Link } from '@material-ui/core';
import fire from '../config/firebase';
import  {withRouter} from 'react-router-dom'
import CryptoJS from 'crypto-js';

function mongoUserLogin(data){
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123456').toString();
  let sending_data = {data: ciphertext};
  fetch("/api/users/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(sending_data)
  }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
  }).then(function(resData) {
      console.log(resData);    
  }).catch(function(err) {
      console.log(err);
  });
}

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  onLogin() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    const auth = fire.auth();
    mongoUserLogin({ email, pass });

    auth.signInWithEmailAndPassword(email, pass).then((u) => {
      this.props.history.push('/Dashboard');
    }).catch((error) => {
      alert('Please check your email or password');
    });

  }

  onKeyPressed(event) {
    if (event.key === 'Enter') {
      var email = document.getElementById('email').value;
      var pass = document.getElementById('pass').value;
      const auth = fire.auth();
      mongoUserLogin({ email, pass });

      auth.signInWithEmailAndPassword(email, pass).then((u) => {
        this.props.history.push('/Dashboard');
      }).catch((error) => {
        console.log(error.message)
        alert('Please check your email or password');
      });
    }
  }

  render() {
    return (
      <div>
        <Grid xs={12} md={4} style={{ minHeight: '400px',marginLeft:'auto',marginRight:'auto',marginTop:'100px'}}>
          <Grid direction='column' alignItems="center" justify="center" >
            <h1>Login CU PART-TIME</h1>
            <Grid item><TextField color="primary" size="small" id="email" label="Email" variant="outlined" fullWidth /></Grid>
            <Grid item><TextField color="primary" size="small" id="pass" label="Password" type='password' variant="outlined" onChange={this.handleChange} onKeyPress={this.onKeyPressed} style={{ marginTop: '10px' }} fullWidth /></Grid>
            <Grid container justify="flex-end">
            
          </Grid>
            <Grid direction='row' style={{float:'right',marginTop:'15px'}}>
              <Button variant='contained' id='loginBtn' color='primary' style={{ marginLeft: '10px', backgroundColor:'#2a3649', width: '150px' }} flip onClick={this.onLogin}>Login</Button>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '80px' }}>
              <Link href="/register" variant="body4">
                Don't have an account? Sign up here
              </Link>
          </Grid>
        </Grid>
      </div>
    )


  };

}
export default withRouter(LoginForm);
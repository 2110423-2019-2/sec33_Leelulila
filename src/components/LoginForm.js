import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import fire from '../config/firebase';
import  {withRouter} from 'react-router-dom'

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    const auth = fire.auth();

    auth.signInWithEmailAndPassword(email, pass).then((u) => {
      this.props.history.push('/Dashboard');
    }).catch((error) => {
      alert('Please check your email or password');
    });

  }

  render() {
    return (
      <div>
        <Grid xs={12} md={4} style={{ minHeight: '400px',marginLeft:'auto',marginRight:'auto',marginTop:'100px'}}>
          <Grid direction='column' alignItems="center" justify="center" >
            <h1>Login CU PART-TIME</h1>
            <Grid item><TextField color="secondary" size="small" id="email" label="Email" variant="outlined" fullWidth /></Grid>
            <Grid item><TextField color="secondary" size="small" id="pass" label="Password" type='password' variant="outlined" style={{ marginTop: '10px' }} fullWidth /></Grid>
            <Grid direction='row' style={{float:'right',marginTop:'10px'}}>
              <Button variant='outlined' color='#32441c' href='/register' >Register</Button>
              <Button variant='contained' color='primary' style={{ marginLeft: '10px', backgroundColor:'#32441c' }} flip onClick={this.onLogin}>Login</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )


  }

}
export default withRouter(LoginForm);
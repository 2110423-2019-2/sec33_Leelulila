import React, { Component } from 'react';
//import fire from '../config/Fire';
import ProfileForm from '../components/ProfileForm.js'
import { Container } from '@material-ui/core';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div>
        <Container>
          <h1>Login</h1>
          <ProfileForm />
        </Container>
      </div>
    );
  }
}

export default Profile;
import React, { Component } from 'react';
import fire from '../config/firebase';
import ProfileForm from '../components/ProfileForm.js'
import { Container } from '@material-ui/core';
import axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: []}
    this.getProfile.bind(this);
  }

  componentDidMount() {
    this.authListener();
    this.getProfile();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  getProfile() {
    var user = fire.auth().currentUser;
    let self = this;
    console.log("/user/" + user.email)
    fetch("/api/users/useremail/"+user.email, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (jsonData) {
      self.setState({ user: jsonData });
      console.log(self.state.user)
      console.log(self.state.user.firstName)
    }).catch(function (err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <Container style = {{marginTop:'100px'}}>
          {(this.state.user._id ||
            this.state.user.firstName ||
            this.state.user.lastName ||
            this.state.user.age ||
            this.state.user.email &&
            this.state.user.phone ||
            this.state.user.gender ||
            this.state.user.birthday ||
            this.state.user.education ||
            this.state.user.about ||
            this.state.user.skill )&&
            <ProfileForm
              _id={this.state.user._id}
              firstName={this.state.user.firstName}
              lastName={this.state.user.lastName}
              age={this.state.user.age}
              email={this.state.user.email}
              phone={this.state.user.phone}
              gender={this.state.user.gender}
              birthday={this.state.user.birthday}
              education={this.state.user.education}
              about={this.state.user.about}
              skill={this.state.user.skill}
            />}            
            
        </Container>
      </div>
    );
  }
}

export default Profile;
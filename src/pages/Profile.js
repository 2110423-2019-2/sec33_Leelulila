import React, { Component } from 'react';
import fire from '../config/firebase';
import ProfileForm from '../components/ProfileForm.js'
import { Container } from '@material-ui/core';
import axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
    }
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
    fetch("/user/101", {
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
    }).catch(function (err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <Container>
          {this.state.user._id &&
            this.state.user.name &&
            this.state.user.surname &&
            this.state.user.age &&
            this.state.user.email &&
            this.state.user.phone &&
            this.state.user.gender &&
            this.state.user.birthdate &&
            this.state.user.education &&
            this.state.user.about &&
            this.state.user.skill &&
            <ProfileForm
              _id={this.state.user._id}
              name={this.state.user.name}
              surname={this.state.user.surname}
              age={this.state.user.age}
              email={this.state.user.email}
              phone={this.state.user.phone}
              gender={this.state.user.gender}
              birthdate={this.state.user.birthdate}
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
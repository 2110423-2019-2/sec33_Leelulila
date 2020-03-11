import React, { Component } from 'react';
import NoEditProfileForm from '../components/NoEditProfileForm.js'
import { Container } from '@material-ui/core';
import axios from 'axios';

class NoEditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user:[]  }
    this.getProfile.bind(this);
  }

  componentDidMount() {
    var url = new URL(window.location.href);
    var email = url.searchParams.get('email');
    console.log(email +' email')
    this.state.email = email
    this.getProfile();
  }

  getProfile() {
    let self = this;
    console.log("/user/" + self.state.email)
    fetch("/useremail/"+self.state.email, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (jsonData) {
      self.setState({ user: jsonData });
      console.log(self.state.user+' userrrrrrrrrrrrrrrrr')
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
            <NoEditProfileForm
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

export default NoEditProfile;
import React, { Component } from 'react';
import fire from '../config/firebase';
import { Grid } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';



class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
    this.addComment = this.addComment.bind(this);
    this.getProfile.bind(this);
  }

  componentDidMount() {
    this.authListener();
    this.getProfile();
  }

  addComment(e) {
    // Prevent the default behaviour of form submit
    e.preventDefault();

    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = e.target.elements.comment.value.trim();
    const name = this.state.user.firstName + ' ' + this.state.user.lastName

    // Make sure name and comment boxes are filled
    if (name && comment) {
      const commentObject = { name, comment };

      console.log(commentObject)
      this.props.handleAddComment(commentObject)
      e.target.elements.comment.value = '';
      e.target.elements.name.value = '';
    }
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
    fetch("/useremail/" + user.email, {
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
        <Divider />
        <p style={{ fontSize: '13px' }}>
          <Grid style={{ display: 'flex' }}>
            <Grid style={{ marginRight: '10px' }}>
              <AccountCircleIcon fontSize='large' />
            </Grid>
            <Grid>
              <form onSubmit={this.addComment}>
                <div className="field">
                  <div className="control">
                    <textarea style={{ height: '35px', width: '400px', fontSize: '15px' }} className="textarea" name="comment" placeholder=" Add a comment"></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button style={{ height: '30px', width: '80px', fontSize: '15px', marginBottom: '10px', }} className="button is-primary">Submit</button>
                  </div>
                </div>
              </form>
            </Grid>
          </Grid>
        </p>
      </div>
    );
  }
}

export default CommentBox;

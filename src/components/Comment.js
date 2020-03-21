import React, { Component } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

class Comment extends Component {
  render() {
    return (
      <article className="media">
        {/* <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Avatar" />
          </p>
        </figure> */}
        <div className="media-content">
          <div className="content">
            
          <Divider />
            <p style={{ fontSize: '13px' }}>
              <Grid style={{ display: 'flex' }}>
                <Grid style={{ marginRight: '10px' }}>
                  <AccountCircleIcon fontSize='large' />
                </Grid>
                <Grid>
                  <strong>{this.props.comment.name}</strong>
                  <br />
                  {this.props.comment.comment}
                </Grid>
              </Grid>
            </p>
          </div>
        </div>
      </article>
    );
  }
}

export default Comment;

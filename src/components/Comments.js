import React, { Component } from 'react';
import Comment from './Comment';
import Divider from '@material-ui/core/Divider';

class Comments extends Component {

  render() {
    if (this.props.comments.length > 0){
      return (
        <section className="section">
          {
            this.props.comments.map((comment, index) => {
              return <Comment key={index} comment={comment} />
            })
          }
        </section>
      );
    }
    else{
      return(
        <p>Add the first Comment</p>
      ); 
    }
  }
}

export default Comments;

import React, { Component } from 'react';
import {Grid,Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//import LoginForm from '../components/LoginForm'
//import Dashboard from './Dashboard';
import CreateBlogForm from '../components/CreateBlogForm';

class CreateBlog extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:{},
        }
      }

    render(){
        return(
            <div>
                <CreateBlogForm/>
            </div>
        );

        
    }
}



export default CreateBlog;
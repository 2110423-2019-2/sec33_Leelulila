import React, { Component } from 'react';
import {Grid,Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//import LoginForm from '../components/LoginForm'
//import Dashboard from './Dashboard';
import CreateJobForm from '../components/CreateJobForm';

class CreateJob extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:{},
        }
      }

    render(){
        return(
            <div>
                <CreateJobForm/>
            </div>
        );

        
    }
}



export default CreateJob;
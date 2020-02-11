import React, { Component } from 'react';
import {Grid,Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import fire from '../config/Fire';
//import LoginForm from '../components/LoginForm'
//import Dashboard from './Dashboard';
import CreatejobForm from '../components/CreatejobForm';

class Createjob extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:{},
        }
      }

   


    render(){
        return(
            <div>
                
                <CreatejobForm/>
            </div>
        );

        
    }
}



export default Createjob;
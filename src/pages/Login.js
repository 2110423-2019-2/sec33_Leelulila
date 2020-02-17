import React, { Component } from 'react';
import  {withRouter} from 'react-router-dom'
import {Grid,Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import fire from '../config/firebase';
import LoginForm from '../components/LoginForm'
import { Container } from '@material-ui/core';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:{},
        }
        
      }

    componentDidMount(){
        this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({ user });
                this.render();

            }else{
                this.setState({user:null});
            }
        })
    }


    render(){
        
        var user = fire.auth().currentUser;
    
        
        if (user){
            console.log('login');
        }
        else{
            console.log('Notlogin');
            return (<div>
                <Container>
                    <h1>Login</h1>
                    <LoginForm/>
                </Container>
            </div>);
        }
        
        



       

        
    }
}

export default withRouter(Login);
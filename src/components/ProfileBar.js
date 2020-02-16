import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import  { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import fire from '../config/firebase';
import '../style.css';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
class ProfileBar extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
        this.isLogin = props.isLogin;
    }

    componentDidMount() {
        this.authListener();
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

    onLogout() {
        fire.auth().signOut();
        return(<Redirect to='/' />)
    }

    render(){
        var user = fire.auth().currentUser;

        

        if(user){
            return(<div style={{display:'flex',flexDirection:'row'}} id='profileNavName'>
                <h3>{fire.auth().currentUser.email}</h3>
                <Button variant="outlined" color="inherit" style={{marginLeft:'10px'}}  
                onClick={this.onLogout} href='/' size='small' >Logout</Button>
            </div>);
        }
        return(<div style={{display:'flex',flexDirection:'row'}} id='proBarRegLog'>
            <Button href='/Register' variant='outlined' color='inherit'>Register</Button>
            <Button href='/login' variant='outlined' color='inherit' id='loginBut'>Login</Button>
        </div>);
    }
}



export default ProfileBar;
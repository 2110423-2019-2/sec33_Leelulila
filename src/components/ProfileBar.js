import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
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
        this.getProfile.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.getProfile();
            } else {
                this.setState({ user: null });
            }
        })
    }

    getProfile() {
        var user = fire.auth().currentUser;
        console.log(user);
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
        }).catch(function (err) {
            console.log(err);
        });
    }

    onLogout() {
        fire.auth().signOut();
        return (<Redirect to='/' />)
    }

    render() {
        var user = fire.auth().currentUser;
        console.log(this.state.user)

        if (user) {
            return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right'}} id='profileNavName'>
                <Button variant="outlined" color="inherit" style={{ marginRight: '15px', fontSize: '1rem'}} size='small' >{this.state.user.wallet || 0} ฿</Button>
                <h3>{this.state.user.firstName}</h3>
                <Button variant="outlined" color="inherit" style={{ marginLeft: '15px'}}
                    onClick={this.onLogout} href='/' size='small' >Logout</Button>

            </div>);
        }
        return (<div style={{ display: 'flex', flexDirection: 'row' }} id='proBarRegLog'>
            <Button href='/Register' variant='outlined' color='inherit'>Register</Button>
            <Button href='/login' variant='outlined' color='inherit' id='loginBut'>Login</Button>
        </div>);
    }
}



export default ProfileBar;
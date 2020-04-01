import React, { Component } from 'react';
import { Grid, Button, Badge, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import fire from '../config/firebase';
import '../style.css';
import NotificationList from './MessageBox'
import CryptoJS from "crypto-js";
import axios from 'axios';

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
            open: false,
            notiBadge: 0,
            listing: [],
        }
        this.isLogin = props.isLogin;
        this.getProfile.bind(this);
        this.handleClick.bind(this);
    }

    componentDidMount() {
        this.authListener();
        this.checkReview();
    }

    checkReview() {
        axios.get('http://cupt_backend:9000/allreview')
            .then(response => {

                this.setState({
                    listing: response.data,
                })

                var list2 = [];
                var user = fire.auth().currentUser.email

                for (var x in this.state.listing) {
                    
                    if (this.state.listing[x]['Writer'] == user) {
                        if (this.state.listing[x]['JobName'].slice(-11) == '   (Edited)') {
                            list2.push(this.state.listing[x]['JobName'].slice(0, -11))
                        } else {
                            list2.push(this.state.listing[x]['JobName'])
                        }
                    }

                }

                this.setState({
                    listing: list2,
                    ready: true,
                })


            })
            .catch((error) => {
                console.log(error);
            })
    }


    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                // this.setState({ user });
                this.getProfile();
            } else {
                // this.setState({ user: null });
            }
        })
    }

    handleClick() {
        this.setState({ open: !this.state.open });
        let self = this;
        var user = fire.auth().currentUser;
        var data = { Email: user.email }
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123456').toString();
        let sending_data = { data: ciphertext };
        fetch("/read", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sending_data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).catch(function (err) {
            console.log(err);
        });

    }

    handleClose() {
        this.setState({
            open: !this.state.open,
            notiBadge: 0
        });
    }

    getProfile() {
        var user = fire.auth().currentUser;
        //console.log(user);
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
            self.setState({
                user: jsonData,
                notiBadge: jsonData.notification.filter(n => n.status < 1).length
            });
        }).catch(function (err) {
            console.log(err);
        });
    }

    onLogout() {
        fire.auth().signOut();
        fetch("/userlogout", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            response.json();
        }).then(function (resData) {
            console.log(resData);
        }).catch(function (err) {
            console.log(err);
        });
        return (<Redirect to='/' />)
    }

    render() {
        var user = fire.auth().currentUser;
        if (user) {
            if (this.state.user.notification == undefined) return null
            else
                return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }} id='profileNavName'>

                    <IconButton onClick={() => this.handleClick()} style={{ marginTop: '0px', marginRight: '15px', fontSize: '1rem' }}>
                        <Badge style={{ fontSize: '1rem' }} badgeContent={this.state.notiBadge} color="primary">
                            <MailIcon style={{ color: 'white' }} />
                        </Badge>
                    </IconButton>

                    <NotificationList reviewed={this.state.listing} open={this.state.open} notifications={this.state.user.notification} onClose={() => this.handleClose()} />
                    <Button variant="outlined" color="inherit" style={{ minWidth: '100px', marginRight: '15px', fontSize: '1rem' }} size='small' >{this.state.user.wallet || 0} ฿</Button>
                    <h3>{this.state.user.firstName}</h3>

                    <Button id='logout' variant="outlined" color="inherit" style={{ marginLeft: '15px' }}
                        onClick={this.onLogout} href='/' size='small' >Logout</Button>

                </div>);
        }
        return (<div style={{ display: 'flex', flexDirection: 'row' }} id='proBarRegLog'>
            <Button href='/Register' id='registerBtn' variant='outlined' color='inherit'>Register</Button>
            <Button href='/login' id='loginBtn' variant='outlined' color='inherit' id='loginBut'>Login</Button>
        </div>);
    }
}



export default ProfileBar;
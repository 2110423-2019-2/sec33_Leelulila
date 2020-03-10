import React, { Component } from 'react';
import fire from '../config/firebase';
import Grid from '@material-ui/core/Grid';
import JobList from '../components/JobList';
import { Container } from '@material-ui/core';
import MyCalendar from '../components/myCalendar';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {}
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

    render() {
        return (
            <div > 
                <Grid style={{ display: 'flex' }}>
                    <Grid item sm={8} style={{ marginLeft: '5px', marginRight: '5px' , marginTop: '100px'}}>
                    <MyCalendar/>   
                    {/* <JobList/> */}
                    </Grid>
                    <Grid item sm={4} style={{ marginLeft: '5px', marginRight: '5px', marginTop: '100px' }}>
                    <JobList/>
                    </Grid>                    
                </Grid>
            </div>);
        
    }
}

export default Profile;
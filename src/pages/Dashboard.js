import React, { Component } from 'react';
import { Grid, Button, TextField, Input } from '@material-ui/core';
import '../style.css';
import ListingJobForm from '../components/ListingJobForm'
import fire from '../config/firebase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SuggestionPlane from '../components/SuggestionPlane'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import axios from 'axios';
import cookie from 'react-cookie'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            db: [],
            listing: [],
            user: [],
            ready: false,
            search: ""
        }
        this.renderList = this.renderList.bind(this);
        // this.token = cookie.load('jwt');
        this.token = 'Bearer '.concat(cookie.load('jwt'));
    }

    onChange = e => {
        this.setState({ search: e.target.value });
    }

    onSearch(event) {
        event.preventDefault();
        if (this.state.db.length > this.state.listing.length)
            this.setState({
                listing: this.state.db,
                ready: true
            })
        let result = this.state.db.filter((note) => {
            let jName = note[0].JobName.toLowerCase()
            return jName.indexOf(this.state.search.toLowerCase()) !== -1
        })
        // console.log(result)
        this.setState({
            listing: result,
            ready: true
        })

    }

    componentDidMount() {
        this.getalljob()
        this.getProfile()
    }

    getalljob() {
        axios.get('http://localhost:9000/api/jobs',
        {
            "headers": {
                'Authorization': this.token
            }
        }
        )
            .then(response => {
                // console.log(this.token);
                
                this.setState({
                    listing: response.data,
                })
                var list2 = [];
                for (var x in this.state.listing) {
                    if (this.state.listing[x]['job']['Status'] == "Ready") {
                        list2.push([this.state.listing[x]['job'], [this.state.listing[x]['_id']]]);
                    }
                }
                this.setState({
                    db: list2,
                    ready: false, 
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getProfile() {
        var user = fire.auth().currentUser;
        let self = this;
        fetch("/api/users/useremail/" + user.email, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(function (response) {
            if (response.status > 401) {
                throw new Error("Bad response from server");
            } else if (response.status === 401) {
                fire.auth().signOut();
                window.location = "http://localhost:3000/login";
                throw new Error('You are not logged in! Please log in to get access');
            }
            return response.json();
        }).then(function (jsonData) {
            self.setState({ user: jsonData });
        }).catch(function (err) {
            console.log(err);
        });
    }

    renderList() {
        if (this.state.ready) {
            if (this.state.listing.length == 0) {
                return (
                    <h1> dont have any job</h1>
                )
            }

            else if (this.state.listing[0]['_id'] == null) {
                //var result =this.state.listing;
                // if(this.state.search == "") {
                //     result=this.state.listing;
                // }
                // else {
                //     result = this.state.listing.filter(note=>note[0].JobName.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)

                // }
                //console.log(result);
                return (
                    this.state.listing.map((notes, key) => {
                        return (
                            <Grid item sm={4} key={notes[1][0]}>
                                <ListingJobForm
                                    JobName={notes[0].JobName}
                                    JobDetail={notes[0].JobDetail}
                                    Wages={notes[0].Wages}
                                    Amount={notes[0].Amount}
                                    Date={notes[0].Date}
                                    BeginTime={notes[0].BeginTime}
                                    EndTime={notes[0].EndTime}
                                    Location={notes[0].Location}
                                    Employer={notes[0].Employer}
                                    CurrentEmployee={notes[0].CurrentEmployee}
                                    CurrentAcceptedEmployee={notes[0].CurrentAcceptedEmployee}
                                    WorkKey={notes[1][0]}
                                    currentJob={this.state.user.currentJob}
                                    search={this.state.search}
                                    TFvector={notes[0].TFvector}
                                />
                            </Grid>
                        )
                    })
                )
            }
        }
        return (
            // <h1>Loading...</h1>
            this.state.db.map((notes) => {
                // console.log(notes[0].TFvector, 'db')
                // console.log(notes[0].JobName);
                return (
                    <Grid item sm={4} key = {notes[1][0]}>
                        <ListingJobForm
                            JobName={notes[0].JobName}
                            JobDetail={notes[0].JobDetail}
                            Wages={notes[0].Wages}
                            Amount={notes[0].Amount}
                            Date={notes[0].Date}
                            BeginTime={notes[0].BeginTime}
                            EndTime={notes[0].EndTime}
                            Location={notes[0].Location}
                            Employer={notes[0].Employer}
                            CurrentEmployee={notes[0].CurrentEmployee}
                            CurrentAcceptedEmployee={notes[0].CurrentAcceptedEmployee}
                            WorkKey={notes[1][0]}
                            currentJob={this.state.user.currentJob}
                            search={this.state.search}
                            TFvector={notes[0].TFvector}
                        />
                    </Grid>
                )
            })
        )


    }

    render() {
        if (this.state.db.length == 0 || this.state.user.length == 0) return null
        else {
            return (
                <Grid style={{ display: 'flex' }}>
                    <Grid item sm={9} container spacing={6} >

                        <div style={{ marginTop: '100px', marginLeft: '10%', marginRight: '0%', width: '85%', marginButtom: '100px', minHeight: '110vh' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h1 id='dashboard-title'>All Jobs</h1>
                                <ViewModuleIcon fontSize='large' color='action' />
                            </div>
                            <Container style={{ backgroundColor: '#EEEEEE', marginTop: '10px' }} >
                                <TextField id="Search" placeholder="Search job here" variant="outlined" onChange={this.onChange} style={{ marginTop: '20px' }} />
                                <IconButton id="SearchButton" onClick={(event) => this.onSearch(event)} style={{ marginTop: '25px' }}>
                                    <SearchIcon />
                                </IconButton>
                                <div style={{ marginTop: '20px' }}>

                                    <Grid container spacing={3}>
                                        {this.renderList()}
                                    </Grid>
                                </div>
                            </Container>
                        </div>
                    </Grid>
                    <Grid id="suggestionPlane" item sm={2} style={{ marginTop: '90px', width: '80%', marginButtom: '100px', minHeight: '110vh' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1>Suggestion</h1>
                            <WhatshotIcon fontSize='large' color='error' />
                        </div>
                        <Container maxWidth="sm" style={{ backgroundColor: '#EEEEEE' }} >
                            <SuggestionPlane db={this.state.db} user={this.state.user} />
                        </Container>
                    </Grid>

                </Grid>
            );
        }
    }
}

export default Dashboard;
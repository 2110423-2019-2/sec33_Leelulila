import React, { Component } from 'react';
import { Grid, Button, TextField, Input } from '@material-ui/core';
import '../style.css';
import ListingJobForm from '../components/ListingJobForm'
import fire from '../config/firebase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';


import axios from 'axios';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            db:[],
            listing: [],
            user: [],
            ready:false,
            search:""
        }
        this.renderList = this.renderList.bind(this);
        
    }

    onChange = e =>{
        this.setState({search: e.target.value});
    }
    
    onSearch(event){
        event.preventDefault();
        if (this.state.db.length > this.state.listing.length) 
        this.setState({
            listing: this.state.db,
            ready: true
        })
        let result = this.state.db.filter((note)=>{
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
        axios.get('http://localhost:9000/getalljob')
            .then(response => {
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
                    //listing: db\\,
                    ready: false, 
                })
                console.log(this.state.listing)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getProfile() {
        var user = fire.auth().currentUser;
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
            console.log(self.state)
            console.log(self.state.user)
        }).catch(function (err) {
            console.log(err);
        });
    }

    renderList(){
        if(this.state.ready){
                if (this.state.listing.length==0){
                    console.log(1);
                    return (
                        <h1> dont have any job</h1>
                    )
                }
                
                else if(this.state.listing[0]['_id'] == null){
                    console.log(this.state.listing);
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
                        //console.log(result);
                        console.log("eieie")
                        console.log(this.state)

                            
                            return (
                                <Grid item xs={4} key = {notes[1][0]}>
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
                                    />
                                </Grid>
                            )
                        console.log("success")
                        })
                     )
                }
        }
        return (
            // <h1>Loading...</h1>
            this.state.db.map((notes, key) => {
                //console.log(result);
                console.log("eieie")
                console.log(this.state)

                    
                    return (
                        <Grid item xs={4}>
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
                            />
                        </Grid>
                         )
                         console.log("success")
                         })
        )
                        

    }

    render() {

        return (
            <div style={{ marginTop: '100px', marginLeft: '10%', width: '80%', marginButtom: '100px', minHeight: '110vh' }}>
                <h1>Find Job</h1>
                <TextField id="Search" onChange={this.onChange}/>
                <IconButton onClick={(event)=>this.onSearch(event)}>
                <SearchIcon />
                </IconButton>
                <div>
                    <Grid container spacing={3}>
                        {this.renderList()}
                    </Grid>
                </div>

            </div>);


    }
}



export default Dashboard;
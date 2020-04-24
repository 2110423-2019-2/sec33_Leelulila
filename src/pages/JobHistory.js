import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import '../style.css';
import ListingJobForm from '../components/ListingJobForm';
import axios from 'axios';
import fire from '../config/firebase';
import JobHistoryForm from '../components/JobHistoryForm';

import cookie from 'react-cookie'

class JobHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listing: {},
            ready:false,
        }
        this.renderList = this.renderList.bind(this);

        this.token = 'Bearer '.concat(cookie.load('jwt'));
    }

    

    componentDidMount(){
        axios.get('http://localhost:9000/api/jobs',
        {
            "headers": {
                'Authorization': this.token
            }
        }
        )
        .then(response => {
          
        this.setState({
            listing: response.data,
          })

          var list2 = [];

          for (var x in this.state.listing) {
            //   console.log(this.state.listing[x]['job'])
            if(this.state.listing[x]['job']['Status']=="Finish" && fire.auth().currentUser.email==this.state.listing[x]['job']['Employer']){
                    list2.push([this.state.listing[x]['job'],[this.state.listing[x]['_id']]]);
            }
              
            
              
          }
          this.setState({
              listing: list2,
              ready:true,
          })
        //   console.log(this.state.listing)

      })
      .catch((error) => {
        console.log(error);
      })
    }

    renderList(){
        // console.log(this.state.ready);
        if(this.state.ready){
            if (this.state.listing.length==0){
                return (
                    <h2>You don't have any job right now</h2>
                );
            }
            
    
            else if(this.state.listing[0]['_id'] == null){
                return (
                    
                    this.state.listing.map((notes) => {
                        return (
                            <Grid item xs={4} >
                                <JobHistoryForm
                                    JobName={notes[0].JobName}
                                    JobDetail={notes[0].JobDetail}
                                    Wages={notes[0].Wages}
                                    Amount={notes[0].Amount}
                                    Date={notes[0].Date}
                                    BeginTime={notes[0].BeginTime}
                                    EndTime={notes[0].EndTime}
                                    Location={notes[0].Location}
                                    Employer={notes[0].Employer}
                                    
                                    Status={notes[0].Status}
                                    WorkKey={notes[1]}
                                    CurrentEmployee={notes[0].CurrentEmployee}
                                />
                                
                            </Grid>
                        )
                    })
                
            )
            }
        }
        return(<h1>Loading...</h1>);
        

        
    }
  
    render() {
        
        return (
            <div style={{ marginTop: '100px', marginLeft: '10%', width: '80%', marginButtom: '100px' }}>
                <h1>Job History</h1>
                <div>
                    <Grid container spacing={3} >
                        {this.renderList()}
                    </Grid>
                </div>

            </div>);


    }
}



export default JobHistory;
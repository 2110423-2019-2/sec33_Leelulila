import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import '../style.css';
import ListingJobForm from '../components/ListingJobForm'
import fire from '../config/firebase';

import axios from 'axios';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listing: {},
        }
        this.renderList = this.renderList.bind(this);
    }

    

    componentDidMount(){
        axios.get('http://localhost:9000/getalljob')
        .then(response => {
          
        this.setState({
            listing: response.data,
          })

          var list2 = [];

          for (var x in this.state.listing) {
              console.log(this.state.listing[x]['job']['Employer']);
              list2.push([this.state.listing[x]['job'],[this.state.listing[x]['_id']]]);
            
              
          }
          this.setState({
              listing: list2,
          })
          console.log(this.state.listing)

      })
      .catch((error) => {
        console.log(error);
      })
    }

    renderList(){
        if (this.state.listing.length==null){
            console.log(1);
            return (
                <h1> dont have any job</h1>
            )
        }
        
        

        else if(this.state.listing[0]['_id'] == null){
            console.log(this.state.listing);
            return (
                
                this.state.listing.map((notes) => {
                console.log(notes[0].JobName);
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
                                WorkKey={notes[1]}
                            />
                        </Grid>
                    )
                })
            
        )
        }

        
    }
  
    render() {
        
        return (
            <div style={{ marginTop: '100px', marginLeft: '10%', width: '80%', marginButtom: '100px' }}>
                <h1>Find Job</h1>
                <div>
                    <Grid container spacing={3}>
                        {this.renderList()}
                    </Grid>
                </div>

            </div>);


    }
}



export default Dashboard;
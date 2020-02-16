import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import '../style.css';
import ListingJobForm from '../components/ListingJobForm';
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
          var j = 'J1';

          for (var x in this.state.listing) {
              
              list2.push(this.state.listing[x][j]);
              var j2 = j.substring(1,2);
              var count = parseInt(j2);
              count+=1;
              j = 'J'+count.toString();
              
          }
        
          this.setState({
              listing: list2,
          })
          
        
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
        

        if(this.state.listing[0]['_id'] == null){
            console.log(this.state.listing);
            return (
                
                this.state.listing.map((notes) => {
                
                    return (
                        <Grid item xs={4}>
                            <ListingJobForm
                                JobName={notes.JobName}
                                JobDetail={notes.JobDetail}
                                Wages={notes.Wages}
                                Amount={notes.Amount}
                                Date={notes.Date}
                                BeginTime={notes.BeginTime}
                                EndTime={notes.EndTime}
                                Location={notes.Location}
                                Employer={notes.Employer}
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

                <h1>Welcome!! User</h1>
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
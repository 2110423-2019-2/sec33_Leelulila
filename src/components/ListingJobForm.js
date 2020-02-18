import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import JobCardModal from '../components/JobCardModal'

import Modal from '@material-ui/core/Modal';


class ListingJobForm extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.JobName = props.JobName;
    this.JobDetail = props.JobDetail;
    this.Wages = props.Wages;
    this.Amount = props.Amount;
    this.Date = props.Date;
    this.BeginTime = props.BeginTime;
    this.EndTime = props.EndTime;
    this.Location = props.Location;
    this.Employer = props.Employer;
    this.WorkKey = props.WorkKey;


    this.state = {
      checkgetjobalready: false,

    }

    // this.onGetjob = this.onGetjob.bind(this);



  }
  
  
  
//   onGetjob(){
//       var employer2 = this.state.employer;
//       var email = fire.auth().currentUser.email;
//       var indexofat = email.indexOf('@');
//       var subemail = email.substring(0,indexofat);
//       var firebaseRef = fire.database().ref('ListingJob').child(this.Workkey);
//       var firebaseRef2 = fire.database().ref('ListingJob').child(this.Workkey);
//       if(!this.Currentemployer.includes(subemail) ){
//         firebaseRef.once('value', snap =>{
        
//           var email = fire.auth().currentUser.email;
//           var indexofat = email.indexOf('@');
//           var subemail = email.substring(0,indexofat);
  
//           var oldemp = snap.val()['Currentemployer'];  
//           var newemp2 = oldemp + ',' + subemail;
//           var newnum2 = snap.val()['Currentnumber']+1;
          
//           firebaseRef.update({
//               Currentnumber:newnum2,
//               Currentemployer:newemp2,
//           })
           
//         });
        
//       window.location.reload(false);
//     }
//   }

  render(){
    
    

    //   var email = fire.auth().currentUser.email;
    //   var indexofat = email.indexOf('@');
    //   var subemail = email.substring(0,indexofat);
        
        return(
          <Card id="ListingJobForm" style={{marginBottom:'20px', height: '250px'}}>
            <div>
              <Grid style={{display:'flex'}}>
                <Grid item md={10}>
                    <h2>Title : {this.JobName}</h2>
                    <p>Wages:{this.Wages}</p>
                    <p>Location:{this.Location}</p>
                    <p>Date:{this.Date}</p>
                </Grid>
               
              </Grid>       
              <JobCardModal
                JobName={this.JobName}
                JobDetail={this.JobDetail}                        
                Wages={this.Wages}
                Amount={this.Amount}
                Date={this.Date}
                BeginTime={this.BeginTime}
                EndTime={this.EndTime}
                Location={this.Location}
                Employer={this.Employer}
                WorkKey={this.WorkKey}
                // Currentemployer={this.Currentemployer}
                />
               
            </div>
          </Card>
        );
      
  }



  

}

ListingJobForm.propTypes = {
    JobName: PropTypes.string,
    JobDetail: PropTypes.string,
    Wages: PropTypes.string,
    Amount: PropTypes.string,
    Date: PropTypes.string,
    BeginTime: PropTypes.string,
    EndTime: PropTypes.string,
    Location: PropTypes.string,
    Employer: PropTypes.string,
    WorkKey: PropTypes.string
    // Status: PropTypes.string
    // this.JobName = props.JobName;
    // this.JobDetail = props.JobDetail;
    // this.Wages = props.Wages;
    // this.Amount = props.Amount;
    // this.Date = props.Date;
    // this.BeginTime = props.BeginTime;
    // this.EndTime = props.EndTime;
    // this.Location = props.Location;
    // this.Employer = props.Employer;
}
export default ListingJobForm;
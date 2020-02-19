import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import JobCardModal from '../components/JobCardModal'
import fire from '../config/firebase';
import Modal from '@material-ui/core/Modal';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';


class ListingJobForm extends Component {

  constructor(props) {
    super(props);
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


  }





  render() {

    if (fire.auth().currentUser.email == this.Employer) {
      return (
        <Card id="ListingJobForm" style={{ marginBottom: '10px', height: '250px', backgroundColor: '#8ed3c4', opacity: '80%', borderRadius: '10%' }}>
          <div>
            <Grid style={{ display: 'flex' }}>
              <Grid item md={12}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <h2>(Owner)Title : {this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p>Wages:{this.Wages}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p>Location:{this.Location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p>Date:{this.Date}</p>
                </div>


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

    return (
      <Card id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: '#e8c4d0', opacity: '80%', borderRadius: '10%', justifyContent: 'center' }}>
        <div>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
            <Grid item xs={6} style={{ justifyContent: 'center', justifyItems: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Title: {this.JobName}</h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MonetizationOnOutlinedIcon/>
                <p> : {this.Wages} ฿</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LocationOnOutlinedIcon/>
                <p> : {this.Location}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EventOutlinedIcon/>
                <p> : {this.Date}</p>
              </div>

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
            </Grid>

          </Grid>

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
  WorkKey: PropTypes.string,
  Status: PropTypes.string
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
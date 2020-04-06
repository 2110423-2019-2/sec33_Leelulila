import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import JobCardModal from '../components/JobCardModal'
import fire from '../config/firebase';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

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
    this.CurrentEmployee = props.CurrentEmployee;
    this.CurrentAcceptedEmployee = props.CurrentAcceptedEmployee;
    this.TFvector = props.TFvector;




    this.state = {
      checkgetjobalready: false,
      currentJobs: [],
      dayandtime: {}
    }
  }

  tfvec2str(tfv) {
    if (tfv != undefined) {
      var str = ''
      var tfvdict = {
        0: 'Male', 1: 'Female', 2: 'Day', 3: 'Night', 4: 'Food'
        , 5: 'Academic', 6: 'Tech&Mechanic', 7: 'Art&Music', 8: 'Activity', 9: 'Others'
      }
      console.log(tfvdict[0])
      console.log(tfv)
      var i;
      for (i = 0; i < tfv.length; i++) {
        if (tfv[i] == 1) str = str+ tfvdict[i] + ' '
      }
      return str
    }
    return 'No tag'
  }

  componentDidMount() {
    try {
      var l = this.props.currentJob;
      for (let i = 0; i < l.length; i++) {
        this.getJobByID(l[i])
      }
    }
    catch (err) {
      window.location.reload()
    }
  }

  CreateDictDayTime() {

  }

  getJobByID(id) {
    let self = this;
    fetch("/api/jobs/" + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (jsonData) {
      self.state.currentJobs.push(jsonData['job'])
      self.setState({ ready: true })
      if (self.state.dayandtime[jsonData['job']['Date']] == null) {
        self.state.dayandtime[jsonData['job']['Date']] = []
      }
      var tuple = []
      tuple = [jsonData['job']['BeginTime'], jsonData['job']['EndTime']]
      self.state.dayandtime[jsonData['job']['Date']].push(tuple)
    }).catch(function (err) {
      console.log(err);
    })
  }


  render() {
    //own
    if (fire.auth().currentUser.email == this.Employer) {
      return (
        <Card alignItems='center' id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: '#D1D1D1', opacity: '80%', borderRadius: '3%', alignItems: 'center' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <StarsIcon style={{ fontSize: 'xx-large', color: '#142f55' }} />
                  <h2>{this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MonetizationOnOutlinedIcon />
                  <p> : {this.Wages} ฿</p>&nbsp;&nbsp;&nbsp;
                  <EventOutlinedIcon />
                  <p> : {this.Date}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocationOnOutlinedIcon />
                  <p> : {this.Location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocalOfferIcon/>
                  <p> : {this.tfvec2str(this.TFvector)}</p>
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
                  CurrentEmployee={this.CurrentEmployee}
                  DayAndTime = {this.state.dayandtime}
                  CurrentAcceptedEmployee = {this.CurrentAcceptedEmployee}
                />

              </Grid>

            </Grid>
          </div>
        </Card>
      );
    }
    //accepted
    else if (this.CurrentEmployee.includes(fire.auth().currentUser.email) || this.CurrentAcceptedEmployee.includes(fire.auth().currentUser.email)) {
      return (

        <Card id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: '#D1D1D1', opacity: '80%', borderRadius: '3%' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <StarsIcon style={{ fontSize: 'xx-large', color: '#142f55' }} />
                  <h2>{this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MonetizationOnOutlinedIcon />
                  <p> : {this.Wages} ฿</p>&nbsp;&nbsp;&nbsp;
                  <EventOutlinedIcon />
                  <p> : {this.Date}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocationOnOutlinedIcon />
                  <p> : {this.Location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocalOfferIcon/>
                  <p> : {this.tfvec2str(this.TFvector)}</p>
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
                  CurrentEmployee={this.CurrentEmployee}
                  DayAndTime = {this.state.dayandtime}
                  CurrentAcceptedEmployee = {this.CurrentAcceptedEmployee}
                />
              </Grid>

            </Grid>


          </div>
        </Card>
      );

    }
    //new
    else {
      return (
        <Card id="ListingJobForm" style={{ marginBottom: '10px', height: '290px', backgroundColor: '#D1D1D1', opacity: '80%', borderRadius: '3%' }}>
          <div>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item md={12}>
 
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <StarsIcon style={{ fontSize: 'xx-large', color: '#142f55' }} />
                  <h2>{this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MonetizationOnOutlinedIcon />
                  <p> : {this.Wages} ฿</p>&nbsp;&nbsp;&nbsp;
                  <EventOutlinedIcon />
                  <p> : {this.Date}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocationOnOutlinedIcon />
                  <p> : {this.Location}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LocalOfferIcon/>
                  <p> : {this.tfvec2str(this.TFvector)}</p>
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
                  CurrentEmployee={this.CurrentEmployee}
                  DayAndTime = {this.state.dayandtime}
                  CurrentAcceptedEmployee = {this.CurrentAcceptedEmployee}
                />

              </Grid>

            </Grid>


          </div>
        </Card>
      );
    }
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
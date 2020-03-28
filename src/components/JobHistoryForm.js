import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import EmployeeListModal from '../components/EmployeeListModal';
import AcceptedEmployeeListModal from '../components/AcceptedEmployeeListModal';
import EmployerMenuAction from './EmployerMenuAction';
import CreateReviewModal from './CreateReviewModal';
import EditJobOwnedForm from '../components/EditJobOwnedForm';
import axios from 'axios';
import fire from '../config/firebase';
import GradeIcon from '@material-ui/icons/Grade';

class JobHistoryForm extends Component {

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
    this.Status = props.Status;
    this.WorkKey = props.WorkKey;
    this.CurrentEmployee = props.CurrentEmployee;

    this.state = {
      checkgetjobalready: false,
      listing: [],
      reviewed: false,

    }
    this.componentDidMount.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:9000/allreview')
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

        if (this.state.listing.includes(this.JobName)) {
          // console.log(tmp)
          this.setState({
            reviewed: true
          })
        }


      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {

    return (
      <Card alignItems="left" id="ListingJobForm" style={{ marginBottom: '20px', height: '250px' }}>
        <div>
          <Grid style={{ display: 'flex', marginLeft: '30px' }}>
            <Grid item xs={12}>
              <h2 class='title'>Title : {this.JobName}</h2>
              <p>Detail : {this.JobDetail}</p>
              <p>Wages : {this.Wages} ฿</p>
              <p>Location : {this.Location}</p>
              <p>Date : {this.Date}</p>
              <p>Time : {this.BeginTime} - {this.EndTime}</p>
            </Grid>
          </Grid>


        </div>
      </Card>
    );

  }

}

JobHistoryForm.propTypes = {
  JobName: PropTypes.string,
  JobDetail: PropTypes.string,
  Wages: PropTypes.string,
  Amount: PropTypes.string,
  Date: PropTypes.string,
  BeginTime: PropTypes.string,
  EndTime: PropTypes.string,
  Location: PropTypes.string,
  Employer: PropTypes.string
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
export default JobHistoryForm;
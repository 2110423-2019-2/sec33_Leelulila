import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import EmployeeListModal from '../components/EmployeeListModal';
import AcceptedEmployeeListModal from '../components/AcceptedEmployeeListModal';
import EmployerMenuAction from './EmployerMenuAction';

import EditJobOwnedForm from '../components/EditJobOwnedForm';

class JobOwnedForm extends Component {

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
    this.CurrentAcceptedEmployee = props.CurrentAcceptedEmployee;
    this.state = {
      checkgetjobalready: false,
      balance: 0

    }

    // this.onGetjob = this.onGetjob.bind(this);

    this.getProfile.bind(this);
    // this.onStartjob = this.onStartjob.bind(this);

  }

  async componentDidMount(){
    const {OmiseCard} = window;
    await OmiseCard.configure({
      publicKey: 'pkey_test_5j5o0s8kryw3qyaiifp'
    });
    
    await OmiseCard.attach();
    await this.getProfile()
  }

  getProfile() {
    let self = this;
    fetch("/useremail/" + this.Employer, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function (jsonData) {
        self.setState({ balance: jsonData.wallet });
    }).catch(function (err) {
        console.log(err);
    });
}

  onPay(event) {
    event.preventDefault();
    if (this.state.balance < this.Wages*this.CurrentAcceptedEmployee.length){
    const {OmiseCard} = window;
    var form = document.querySelector("#checkoutForm");
    OmiseCard.open({
      amount: ((this.Wages*this.CurrentAcceptedEmployee.length)-this.state.balance)*100,
      currency: "THB",
      defaultPaymentMethod: "credit_card",
      onCreateTokenSuccess: (nonce) => {
          if (nonce.startsWith("tokn_")) {
              form.omiseToken.value = nonce;
          } else {
              form.omiseSource.value = nonce;
          };
          fetch("/wallet/job/" + this.WorkKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
          }).then(function (jsonData) {
            if (jsonData.status === 1) console.log("Notify Users")
          }).then(
            window.location.reload(false)
          ).catch(function (err) {
            console.log(err);
          });
      }
    });
  }
  else{
    fetch("/wallet/job/" + this.WorkKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (jsonData) {
      if (jsonData.status === 1) console.log("Notify Users")
    }).then(
      window.location.reload(false)
    ).catch(function (err) {
      console.log(err);
    });
  }

  


  }

  


  render() {
    console.log(this.status)
    if(this.Status == 'Ready'){
      return (
        <Card alignItems="left" id="ListingJobForm" style={{ marginBottom: '20px', height: '270px' }}>
          <div>
            <Grid style={{ display: 'flex' }}>
              <Grid item md={10}>
                <h2>Title : {this.JobName}</h2>
                <p>Detail : {this.JobDetail}</p>
                <p>Wages : {this.Wages} ฿</p>
                <p>Location : {this.Location}</p>
                <p>Date : {this.Date}</p>
                <p>Time : {this.BeginTime} - {this.EndTime}</p>
              </Grid>
              
              <Grid>
                <EmployerMenuAction
                WorkKey={this.WorkKey}
                _id = {this.props._id} 
                wages={this.props.Wages} 
                detail={this.props.JobDetail} 
                location={this.props.Location} 
                workDate={this.props.Date} 
                timeBegin={this.props.BeginTime} 
                timeEnd={this.props.EndTime}
                Amount={this.Amount}
                CurrentAcceptedEmployee={this.CurrentAcceptedEmployee}/>
               
              </Grid>
            </Grid>
  
  
          </div>
        </Card>
      );
    }
    else if(this.Status == 'Confirm'){
      return (
        <Card alignItems="left" id="ListingJobForm" style={{ marginBottom: '20px', height: '270px' }}>
          <div>
            <Grid style={{ display: 'flex' }}>
              <Grid item md={10}>
                <h2>Start</h2>
                <h2>Title : {this.JobName}</h2>
                <p>Detail : {this.JobDetail}</p>
                <p>Wages : {this.Wages} ฿</p>
                <p>Location : {this.Location}</p>
                <p>Date : {this.Date}</p>
                <p>Time : {this.BeginTime} - {this.EndTime}</p>
              </Grid>
              
              <Grid>
                  <form id="checkoutForm" >
                  <input type="hidden" name="omiseToken"/>
                  <input type="hidden" name="omiseSource"/>
                  <input type="hidden" name="jobID"/>
                  {(this.CurrentAcceptedEmployee.length > 0) &&
                   <Button variant="contained" color="primary" id = "checkout-button" type = "submit" 
                   onClick = {(event)=>this.onPay(event)} style={{ height: '40px', marginTop: '10%'}}>Pay</Button>}
                </form>
                
              </Grid>
            </Grid>
  
  
          </div>
        </Card>
      );
      return({});
    }

    

    

  }





}

JobOwnedForm.propTypes = {
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
export default JobOwnedForm;
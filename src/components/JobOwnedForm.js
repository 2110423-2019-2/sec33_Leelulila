import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import '../style.css';
import EmployeeListModal from '../components/EmployeeListModal';
import AcceptedEmployeeListModal from '../components/AcceptedEmployeeListModal';


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

    this.state = {
      checkgetjobalready: false,
      balance: 0

    }

    // this.onGetjob = this.onGetjob.bind(this);

    this.onDeletejob = this.onDeletejob.bind(this);
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


  onDeletejob() {
    fetch("/job/" + this.WorkKey, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(window.location.reload(false))
    // window.location.reload(false);
  }

  onConfirm(){

    var data = { Status: 'Confirm' };

    fetch("/jobstatus/" + this.WorkKey, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(window.location.reload(false));
  }

  onPay(event) {
    event.preventDefault();
    if (this.state.balance < this.Wages*this.Amount){
    const {OmiseCard} = window;
    var form = document.querySelector("#checkoutForm");
    OmiseCard.open({
      amount: ((this.Wages*this.Amount)-this.state.balance)*100,
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
          }).then(
            window.location.reload(false)
            )
          // console.log(nonce)
          // form.jobID.value = this.WorkKey;
          // form.submit();
      }
    });
  }
  else{
    fetch("/wallet/job/" + this.WorkKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(
      window.location.reload(false)
    )
  }
  }

  // onStartjob(){
  //   var firebaseRef = fire.database().ref('ListingJob')

  //   firebaseRef.child(this.Workkey).update({
  //     Status:'In Duty'
  //   })
  //   window.location.reload(false);
  // }


  render() {
    //   var email = fire.auth().currentUser.email;
    //   var indexofat = email.indexOf('@');
    //   var subemail = email.substring(0,indexofat);
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
                <EmployeeListModal
                WorkKey={this.WorkKey} />
                <AcceptedEmployeeListModal
                WorkKey={this.WorkKey} />
                <Grid item xs={6}>
                  <EditJobOwnedForm  _id = {this.props._id} wages={this.props.Wages} detail={this.props.JobDetail} location={this.props.Location} workDate={this.props.Date} timeBegin={this.props.BeginTime} timeEnd={this.props.EndTime}/>
                  <Button variant="contained" color="primary" onClick={this.onConfirm} style={{ height: '40px', marginTop: '20%', marginRight: '20px' }}>Confirm</Button>            
                  <Button variant="contained" color="secondary" onClick={this.onDeletejob} style={{ height: '40px', marginTop: '20%', marginRight: '20px' }}>Delete</Button>            
                </Grid>
              </Grid>
            </Grid>
  
  
          </div>
        </Card>
      );
    }

    return (
      <Card alignItems="left" id="ListingJobForm" style={{ marginBottom: '20px', height: '270px' }}>
        <div>
          <Grid style={{ display: 'flex' }}>
            <Grid item md={10}>
              <h2>Confirm</h2>
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
                {(this.CurrentEmployee.length > 0) && <Button variant="contained" color="primary" id = "checkout-button" type = "submit" onClick = {(event)=>this.onPay(event)} style={{ height: '40px', marginTop: '10%'}}>Pay</Button>}
              </form>
              
            </Grid>
          </Grid>


        </div>
      </Card>
    );

    

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
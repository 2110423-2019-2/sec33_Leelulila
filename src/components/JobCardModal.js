import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import fire from '../config/firebase';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CryptoJS from "crypto-js";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
  }
};

//   Modal.setAppElement('#yourAppElement')


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class JobCardModal extends Component {

  constructor(props) {
    super(props);
    this.JobName = props.JobName
    this.JobDetail = props.JobDetail;
    this.Wages = props.Wages;
    this.Amount = props.Amount
    this.Date = props.Date;
    this.BeginTime = props.BeginTime;
    this.EndTime = props.EndTime;
    this.Location = props.Location;
    this.Employer = props.Employer;
    this.WorkKey = props.WorkKey;
    this.DayAndTime = props.DayAndTime
    console.log(this.WorkKey);
    // this.Currentnumber = props.Currentnumber;
    this.CurrentEmployee = props.CurrentEmployee;
    this.CurrentAcceptedEmployee = props.CurrentAcceptedEmployee;

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onGetjob = this.onGetjob.bind(this);

  }


  intersect(newDate, newBeginTime, newEndTime) {
    var DayAndTime = this.DayAndTime;
    var tuple;
    var day = DayAndTime[newDate]
    if(day != undefined){
      var re = false;
      day.forEach(function(tuple){
        console.log(newBeginTime,tuple[0],newEndTime,tuple[1])
        if(newBeginTime<=tuple[0] && newEndTime>=tuple[0]){
          console.log('left')
          re = true          
        }
        else if(newBeginTime>=tuple[0] && newEndTime<=tuple[1]){
          console.log('in')
          re = true          
        }
        else if(newBeginTime<=tuple[0] && newEndTime>=tuple[1]){
          console.log('out')
          re = true          
        }
        else if(newBeginTime<=tuple[1] && newEndTime>=tuple[1]){
          console.log('right')
          re = true          
        }
      });
      return re
    }
    else{    
      console.log(day)
      return false
    }
  }

  onGetjob() {
    var newDate = this.Date
    var newBeginTime = this.BeginTime
    var newEndTime = this.EndTime
    var boo = this.intersect(newDate, newBeginTime, newEndTime);
    if(!boo){
      var email = fire.auth().currentUser.email;
      var data = { Email: email };

      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123456').toString();
      let sending_data = {data: ciphertext};

      fetch("api/jobs/" + this.WorkKey + "/employee", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sending_data)
      }).then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(window.location.reload(false))
        .catch(function (err) {
          console.log(err);
        });
    }
    else{
      alert('You cannot work at another job at the same time!');
    }
  }
  // axios.put('http://localhost:9000/job/addemployee/' + this.WorkKey, obj)
  //   .then(alert("Success")  )

  

  openModal() {
    this.setState({ modalIsOpen: true });
  }



  closeModal() {
    this.setState({ modalIsOpen: false });
  }



  render() {
    if (fire.auth().currentUser.email == this.Employer) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center' }}><Button variant="contained" color='secondary' style={{
            textAlign: 'center',
            paddingLeft: 40,
            paddingRight: 40,
            marginTop: 10,
            height: 40,
            width: 180,
            justifyContent: 'center',
            backgroundColor: '#142f55'
          }} onClick={this.openModal}>More Detail</Button></Grid>

          <Modal
            md={12}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2>Title : {this.JobName}</h2>
            <h3>Description : {this.JobDetail}</h3>
            <p>Wages : {this.Wages} ฿</p>
            <p>Location : {this.Location}</p>
            <p>Date : {this.Date}</p>
            <p>Time : {this.BeginTime} - {this.EndTime}</p>
            <Button variant="contained" disabled>Owned</Button>
          </Modal>
        </div>
      )
    }

    else if (this.CurrentEmployee.includes(fire.auth().currentUser.email) ||  this.CurrentAcceptedEmployee.includes(fire.auth().currentUser.email)) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center' }}><Button variant="contained" color='secondary' style={{
            textAlign: 'center',
            paddingLeft: 40,
            paddingRight: 40,
            marginTop: 10,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#142f55'
          }} onClick={this.openModal}>More Detail</Button></Grid>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}

            contentLabel="Example Modal"
          >

            <h2>Title : {this.JobName}</h2>
            <h3>Description : {this.JobDetail}</h3>
            <p>Wages : {this.Wages} ฿</p>
            <p>Location : {this.Location}</p>
            <p>Date : {this.Date}</p>
            <p>Time : {this.BeginTime} - {this.EndTime}</p>
            <p>Employer : {this.Employer}</p>
            <Button variant="contained" disabled>Already Apply</Button>
          </Modal>
        </div>
      )

    }


    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center' }}><Button variant="contained" color='white' style={{
          textAlign: 'center',
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: 10,
          height: 40,
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#142f55',
        }} onClick={this.openModal}>More Detail</Button></Grid>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2>Title : {this.JobName}</h2>
          <h3>Description : {this.JobDetail}</h3>
          <p>Wages : {this.Wages} ฿</p>
          <p>Location:  {this.Location}</p>
          <p>Date : {this.Date}</p>
          <p>Time : {this.BeginTime} - {this.EndTime}</p>
          <p>Employer : {this.Employer}</p>
          <Button variant="contained" color='primary' onClick={()=>this.onGetjob()}>Apply</Button>

        </Modal>
      </div>
    )

  }


}
export default JobCardModal;
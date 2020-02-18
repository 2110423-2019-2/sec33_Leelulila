import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';
import fire from '../config/firebase';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
//   Modal.setAppElement('#yourAppElement')

   
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class JobCardModal extends Component{

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
        // this.Currentnumber = props.Currentnumber;
        // this.Currentemployer = props.Currentemployer;

        this.state = {
            modalIsOpen: false
          };
       
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
          this.onGetjob = this.onGetjob.bind(this);
        
    }

    

    onGetjob(){
      var email = fire.auth().currentUser.email;
      var data = {Email: email};
      fetch("/job/addemployee/" + this.WorkKey, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(resData) {
        // history.push("/");
        // console.log(resData);      
    }).catch(function(err) {
        console.log(err);
    });
}
      // axios.put('http://localhost:9000/job/addemployee/' + this.WorkKey, obj)
      //   .then(alert("Success")  )

      




    openModal() {
        this.setState({modalIsOpen: true});
      }
     
     
     
      closeModal() {
        this.setState({modalIsOpen: false});
      }
   


  render(){
    return(
        <div>
            <button onClick={this.openModal}>More Detail</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
    
                      <h1>Title : {this.JobName}</h1>
                      <h3>Description : {this.JobDetail}</h3>
                      <p>Wages:{this.Wages}</p>
                      <p>Location:{this.Location}</p>
                      <p>Date:{this.Date}</p>
                      <p>Time : {this.BeginTime} - {this.EndTime}</p>
                      <p>Employer:{this.Employer}</p>
                      <Button variant="contained" color="primary" onClick={this.onGetjob}>Apply</Button>

            </Modal>
        </div>
    )

  }


}
export default JobCardModal;
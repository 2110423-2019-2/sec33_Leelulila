import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';



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
        // this.Currentnumber = props.Currentnumber;
        // this.Currentemployer = props.Currentemployer;

        this.state = {
            modalIsOpen: false
          };
       
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
          this.onGetjob = this.onGetjob.bind(this);
        
    }

    componentDidMount(){
      axios.get('http://localhost:9000/getalljob')
    .then(response => {
        
      
        })
        
      
    }

    onGetjob(){
    //   var employer2 = this.state.employer;
    //   var email = fire.auth().currentUser.email;
    //   var indexofat = email.indexOf('@');
    //   var subemail = email.substring(0,indexofat);
    //   var firebaseRef = fire.database().ref('ListingJob').child(this.Workkey);
    //   var firebaseRef2 = fire.database().ref('ListingJob').child(this.Workkey);
    //   if(!this.Currentemployer.includes(subemail) ){
    //     firebaseRef.once('value', snap =>{
        
    //       var email = fire.auth().currentUser.email;
    //       var indexofat = email.indexOf('@');
    //       var subemail = email.substring(0,indexofat);
  
    //       var oldemp = snap.val()['Currentemployer'];  
    //       var newemp2 = oldemp + ',' + subemail;
    //       var newnum2 = snap.val()['Currentnumber']+1;
          
    //       firebaseRef.update({
    //           Currentnumber:newnum2,
    //           Currentemployer:newemp2,
    //       })
           
    //     });
        
    //   window.location.reload(false);
    // }
  }




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
                      <p>BeginTime:{this.BeginTime}</p>
                      <p>EndTime:{this.EndTime}</p>
                      <p>Employer:{this.Employer}</p>
                      <Button variant="contained" color="primary" onClick={this.onGetjob}>Apply</Button>

            </Modal>
        </div>
    )

  }


}
export default JobCardModal;
import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import EmployeeListTable from './EmployeeListTable'
import fire from '../config/firebase';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';



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

class EmployeeListModal extends Component {

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
    console.log(this.WorkKey);
    // this.Currentnumber = props.Currentnumber;
    this.CurrentEmployee = props.CurrentEmployee;

    this.state = {
      modalIsOpen: false,
      listing:[]
    };
    

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount(){
    
    axios.get('http://localhost:9000/job/'+ this.WorkKey[0])
    .then(response => {
        console.log(response.data.job.CurrentEmployee)
        this.setState({
            listing: response.data.job.CurrentEmployee,
          })
          
          var list2=[]
          for (var x in this.state.listing) {
            console.log(x)
            console.log(this.state.listing[x])
            console.log(this.state.listing)
            axios.get('http://localhost:9000/useremail/'+ this.state.listing[x])
            .then(response => {
              console.log(response.data)
              list2.push([response.data.firstName,response.data.lastName,response.data.gender,response.data.email])
            })
          
            console.log(this.state.listing)
           
      }
            this.setState({
              listing: list2,
            })
            console.log(this.state.listing)
  })
  .catch((error) => {
    console.log(error);
  })
}

  // onGetjob() {
  //   var email = fire.auth().currentUser.email;
  //   var data = { Email: email };
  //   fetch("/job/addemployee/" + this.WorkKey, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  //   }).then(function (response) {
  //     if (response.status >= 400) {
  //       throw new Error("Bad response from server");
  //     }
  //     return response.json();
  //   }).then(window.location.reload(false))
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // }
  // axios.put('http://localhost:9000/job/addemployee/' + this.WorkKey, obj)
  //   .then(alert("Success")  )






  openModal() {
    this.setState({ modalIsOpen: true });
  }



  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  // onShowEmployee() {
  //   fetch("/job/" + this.WorkKey, {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //   }).then(window.location.reload(false))
  //   // window.location.reload(false);
  // }

  


  render() {
   

   
      return (
        <div>
            <Button variant="contained" color="primary" onClick={this.openModal} style={{ height: '40px', marginRight: '20px' }}>Applicant</Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {console.log(this.state.listing)}
            <EmployeeListTable
            EmployeeList={this.state.listing}
            WorkKey={this.WorkKey}
            />
           
          </Modal>
        </div>
      )

    

  }


}
export default EmployeeListModal;
import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import AcceptedEmployeeListTable from './AcceptedEmployeeListTable'
import fire from '../config/firebase';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';

import cookie from 'react-cookie'


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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
    
  />
));

const StyledMenuItem = withStyles(theme => ({

  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
//   Modal.setAppElement('#yourAppElement')


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class AcceptedEmployeeListModal extends Component {

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
    this.CurrentEmployee = props.CurrentEmployee;

    this.state = {
      modalIsOpen: false,
      listing:[]
    };
    

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.token = 'Bearer '.concat(cookie.load('jwt'));
  }

  componentDidMount(){
    
    axios.get('http://localhost:9000/api/jobs/'+ this.WorkKey[0],
    {
      "headers": {
          'Authorization': this.token
      }
    }
    )
    .then(response => {
        this.setState({
            listing: response.data.job.CurrentAcceptedEmployee,
          })
          
          var list2=[]
          for (var x in this.state.listing) {
            axios.get('http://localhost:9000/api/users/useremail/'+ this.state.listing[x],
            {
              "headers": {
                  'Authorization': this.token
              }
            }
            )
            .then(response => {
              list2.push([response.data.firstName,response.data.lastName,response.data.gender,response.data.email])
            })
           
      }
            this.setState({
              listing: list2,
            })
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
        <StyledMenuItem>
            <ListItemText primary="Employee" onClick={this.openModal} />
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <AcceptedEmployeeListTable
            EmployeeList={this.state.listing}
            />
           
          </Modal>
        </StyledMenuItem>
      )

    

  }


}
export default AcceptedEmployeeListModal;
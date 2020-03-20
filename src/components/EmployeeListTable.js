import React, { Component } from 'react'
import { Button, Grid } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';




class EmployeeListTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log(props)
      this.WorkKey = props.WorkKey
      this.EmployeeList = props.EmployeeList;
      this.Amount = props.Amount;
      this.CurrentAcceptedEmployee = props.CurrentAcceptedEmployee;
      this.state = {
         EmployeeList: this.EmployeeList,

      }
      this.onDeclineEmployee = this.onDeclineEmployee.bind(this);
      this.onAcceptEmployee = this.onAcceptEmployee.bind(this);


   }


   



   onDeclineEmployee(email) {

      var data = { Email: email };

      fetch("/job/CurrentEmployee/" + this.WorkKey, {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data),
      }).then(window.location.reload(false));

      // window.location.reload(false);
   }

   onAcceptEmployee(email) {
      console.log(this.WorkKey)
      var data = { Email: email };

      fetch("/job/addacceptedemployee/" + this.WorkKey, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
      }).then(window.location.reload(false));

   }

   onViewProfile(email) {
      console.log('view')
      //window.location.href = `/noeditprofile`;
      window.location.href = `/noeditprofile?email=${email}`;
   }

   renderTableData() {
      return this.state.EmployeeList.map((Employee) => {
         var fname = Employee[0]
         var lname = Employee[1]
         var sex = Employee[2]
         var email = Employee[3]
         console.log(this.CurrentedAcceptEmployee)


         if(this.CurrentAcceptedEmployee.length < this.Amount){
            return (

               <tr style={{ paddingLeft: '200px' }}>
                  <td>
                     <IconButton onClick={() => this.onViewProfile(email)}>
                        <AccountCircleIcon />
                     </IconButton>
                  </td>
                     <td>{fname}</td>
                     <td>{lname}</td>
                     <td>{sex}</td>
                     {console.log(email)}
                     <td><Button variant="contained" color="primary" onClick={() => this.onAcceptEmployee(email)} style={{ height: '30px', width: '50px' }}>Accept</Button></td>
                     <td><Button variant="contained" color="secondary" onClick={() => this.onDeclineEmployee(email)} style={{ height: '30px', width: '50px' }}>Decline</Button></td>
               </tr>
            )
         }
         return (

            <tr style={{ paddingLeft: '200px' }}>
               <td>
                  <IconButton onClick={() => this.onViewProfile(email)}>
                     <AccountCircleIcon />
                  </IconButton>
               </td>
                  <td>{fname}</td>
                  <td>{lname}</td>
                  <td>{sex}</td>
                  {console.log(email)}
                  <td><Button variant="contained" color="primary" disabled onClick={() => this.onAcceptEmployee(email)} style={{ height: '30px', width: '50px' }}>Accept</Button></td>
                  <td><Button variant="contained" color="secondary" disabled onClick={() => this.onDeclineEmployee(email)} style={{ height: '30px', width: '50px' }}>Decline</Button></td>
            </tr>
         )


         
      })
   }

   renderTableHeader() {
      return (
               <tr>
                  <td><h3>Profile</h3></td>
                  <td><h3>FirstName</h3></td>
                  <td><h3>LastName</h3></td>
                  <td><h3>Sex</h3></td>
               </tr>
      )
   }


   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
                  console.log(this.state.EmployeeList.length)
      if (this.state.EmployeeList.length == 0) {
         return (
               <div>
                  <h1>No Applicant</h1>
               </div>
         )
      }
      return (
               <div>
                  <table id='students'>
                     <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData()}
                     </tbody>
                  </table>
               </div>
      )
   }
}

export default EmployeeListTable
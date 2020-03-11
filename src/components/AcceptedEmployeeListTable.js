import React, { Component } from 'react'
import { Button, Grid } from '@material-ui/core';


class AcceptedEmployeeListTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log(props)
      this.EmployeeList = props.EmployeeList;
      
      this.state = {
        EmployeeList:this.EmployeeList,
    }
    this.onDeclineEmployee = this.onDeclineEmployee.bind(this);

   }

   onDeclineEmployee(email) {

    var data = { Email: email };

    fetch("/employeelist/" + this.WorkKey, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(window.location.reload(false))
    // window.location.reload(false);
  }

    onAcceptEmployee(email) {

        var data = { Email: email };

        fetch("/employeelist/" + this.WorkKey, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        }).then(window.location.reload(false))
        // window.location.reload(false);
    }

   renderTableData() {
    return this.state.EmployeeList.map((Employee) => {
       var fname = Employee[0]
       var lname = Employee[1]
       var sex = Employee[2]
       var email = Employee[3]
       console.log(fname)

        


       return (
           
          <tr style={{paddingLeft:'200px'}}>
             <td>{fname}</td>
             <td>{lname}</td>
             <td>{sex}</td>
          </tr>
        )
        })
    }

    renderTableHeader() {
           return (
        <tr>
                <td><h3>FirstName</h3></td>
                <td><h3>LastName</h3></td>
                <td><h3>Sex</h3></td>
        </tr>
           )
     }


   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
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

export default AcceptedEmployeeListTable
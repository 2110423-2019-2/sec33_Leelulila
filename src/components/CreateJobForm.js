import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button ,Grid} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
// import fire from '../config/Fire';
import  { Redirect } from 'react-router-dom';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import TextareaAutosize from 'react-textarea-autosize';

class CreateJobForm extends Component{

  constructor(props) {
    super(props);
    this.onCreatejob = this.onCreatejob.bind(this);
    this.state = {
        User:{},
        selectedDate: null,
        selectedBegintime: null,
        selectedEndtime: null,
        checkCreatejob: false,
        Workkey:''
    }
    // this.database = fire.database().ref("ListingJob");

    // this.database.on('value', snap =>{
        
    //     var max = 0;

    //     for (var x in snap.val()){
            
    //         if(x[0]=='J'){
    //             var y = parseInt(x.substring(1,));
    //             if(y>max){
    //                 max=y;
    //             }
    //         }
    //     }
    //     max = max+1;
    //     this.setState({
    //         Workkey:'J'+max.toString()
    //     })
    //     console.log(this.state.Workkey);
        
        
    // })

    
  }

    formatDate(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
}
  
    handleDateChange = date => {
    
    
        const newdate = this.formatDate(date);
        this.setState({
            selectedDate: newdate
        })
    }
    //why handle time must have two function    
    handleBeginTimeChange = time => {
        this.setState({
            selectedBegintime: time
        })
    } 
    handleEndTimeChange = time => {
        this.setState({
            selectedEndtime: time
        })
    }       
 
   


  onCreatejob(){
    var jobname = document.getElementById('jobname').value;
    var jobdes = document.getElementById('jobdescription').value;
    var wages = document.getElementById('wages').value;
    var amount = document.getElementById('amount').value;
    var location = document.getElementById('location').value;
    var begintime = document.getElementById('timebegin').value;
    var endtime = document.getElementById('timeend').value;
    var date = this.state.selectedDate;

  
   
    }



  render(){
    console.log(this.Workkey);
    if(!this.state.checkCreatejob){
        return (

            <div style={{ marginTop: '100px', marginBottom: '100px',paddingLeft:'25%' }}>
                <h1>Create Job</h1>
                <form>
                    <Grid xs={12} md={8}>
                        <Grid style={{ margin: '16px',display:'flex',direction:'column' }}>
                            <h3>Jobname : </h3>
                            <TextField name='Jobname' id="jobname" variant="outlined" margin='dense' style={{marginLeft:'20px'}} />
                        </Grid>
                        <Grid style={{ margin: '16px' }}>
                            <h3>Detail :</h3>
                            <TextareaAutosize rowsMin={10} rowsMax={10} style={{width:'100%',height:'100%'}} name='detail' id="jobdescription" label="Detail"/>
                        </Grid>
                        <Grid style={{ margin: '16px',display:'flex',direction:'column' }}>
                            <h3>Time :</h3>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id='timebegin'
                                    label="Time picker"
                                    value={this.state.selectedBegintime}
                                    onChange={this.handleBeginTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            
                    
                            <h3>to</h3>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id='timeend'
                                    label="Time picker"
                                    value={this.state.selectedEndtime}
                                    onChange={this.handleEndTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid style={{ margin: '16px',display:'flex',direction:'column' }}>
                            <h3>Date</h3>
    
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Select Work Date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    /> 
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid style={{ margin: '16px' }}>
                            <TextField name='wages' id='wages' label="Wages (Baht)" variant="outlined" type='number'  />
                            <TextField name='people' id='amount' label="Limited Person" variant="outlined" type='number' style={{marginLeft:'16px'}} />
                            <TextField name='location' id='location' label="Location" variant="outlined" style={{marginLeft:'16px'}}  />
                        </Grid>
                        
                        <Grid style={{ margin: '16px',right:'0px',float:'right'}}>
                        <Button variant="contained" color="primary" onClick={this.onCreatejob} >Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
    return (
        // <Redirect to='/dashboard' />
        {}
        );
}

}
export default CreateJobForm;
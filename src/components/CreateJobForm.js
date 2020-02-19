import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button, Grid } from '@material-ui/core';
// import fire from '../config/Fire';
import { Redirect } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import fire from '../config/firebase';

class CreateJobForm extends Component {

    constructor(props) {
        super(props);
        this.onCreatejob = this.onCreatejob.bind(this);
        this.state = {
            User: {},
            selectedDate: null,
            selectedBegintime: null,
            selectedEndtime: null,
            checkCreatejob: false,
            Workkey: '',
            redirect: false
        }
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
    // var jobname = document.getElementById('jobname').value;
    // var jobdes = document.getElementById('jobdescription').value;
    // var wages = document.getElementById('wages').value;
    // var amount = document.getElementById('amount').value;
    // var location = document.getElementById('location').value;
    // var begintime = document.getElementById('timebegin').value;
    // var endtime = document.getElementById('timeend').value;
    // var date = this.state.selectedDate;
    console.log("Create Job success");
    }



    //push data to mongoDB
    onCreatejob() { 
        
        //get all data from element below
        var data = {
            JobName: document.getElementById('jobname').value,
            JobDetail: document.getElementById('jobdescription').value,
            Wages: document.getElementById('wages').value,
            Amount: document.getElementById('amount').value,
            Location: document.getElementById('location').value,
            BeginTime: document.getElementById('timebegin').value,
            EndTime: document.getElementById('timeend').value,
            Date: document.getElementById('workDate').value,
            CurrentEmployee: [],
            Employer: fire.auth().currentUser.email,
            Status: "Ready"
        }
        if(data.JobName.length == 0 || data.JobDetail.length == 0 || data.Wages.length == 0 || data.Amount.length == 0 || data.Location.length == 0){
            alert("Please fill the Empty Box")
        }
        else{
            alert("Your job is being added!")
            //this function will push data to db
            this.mongoCreateJob(data);
        
            
        }
        
    }

  

    mongoCreateJob(data) {
        //send request data to backend /newjob ***pull the lastest backend first***
        fetch("/newjob", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) //To push data via htmlRequest, data must be send in form of string so use Stringify to make obj to string
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(this.setState({
            redirect: true 
        })).catch(function (err) {
            console.log(err);
        });
        
    }

    render() {
        const { redirect } = this.state;
        console.log(this.Workkey);
        if (redirect) {
            return <Redirect to='/Dashboard'/>;
          }
        if (!this.state.checkCreatejob) {
            return (

                <div style={{ marginTop: '100px', marginBottom: '100px', paddingLeft: '25%' }}>
                    <h1>Create Job</h1>
                    <form>
                        <Grid xs={12} md={8}>
                            <Grid style={{ margin: '16px', display: 'flex', direction: 'column' }}>
                                <h3> Jobname : </h3>
                                <TextField inputProps={{maxLength: 20}} name='Jobname' id="jobname" color="secondary" variant="outlined" margin='dense' style={{ marginLeft: '20px' ,width: '300px'}} />
                                <h3 style = {{"padding-left": "20px" }}>Number of Employee :</h3>
                            <TextField name='people' color="secondary" id='amount' label="Limited Person" variant="outlined" type='number' style={{marginLeft:'16px' ,width: '178px'}} />
                            </Grid>
                            <Grid style={{ margin: '16px' }}>
                                <h3>Details :</h3>
                                <TextField multiline={true} rows={5} color="secondary" name='detail' id="jobdescription" variant="outlined" margin='dense' style = {{width: 794}}/>
                            </Grid>
                            <Grid style={{ margin: '16px', display: 'flex', direction: 'column' , marginTop: '40px'}}>
                                <h3>Time :</h3>
                                <DatePicker
                                    id='timebegin'
                                    label="Start time"
                                    type='time'
                                    defaultValue={'00:00'}
                                />

                                <h3>to</h3>
                                <DatePicker
                                    id='timeend'
                                    label="End time"
                                    type='time'
                                    defaultValue={'00:00'}
                                />
                            <TextField name='location' color="secondary" id='location' label="Location" variant="outlined" style={{ marginLeft: '25px' }} />
                            </Grid>
                            <Grid style={{ margin: '16px', display: 'flex', direction: 'column' }}>
                                <h3>Date :</h3>
                                <DatePicker
                                    id='workDate'
                                    label="Select Work Date"
                                    type='date'
                                    defaultValue={'2020-02-02'}
                                    
                                />
                                <TextField name='wages' color="secondary" id='wages' label="Wages (Baht)" variant="outlined" type='number' style={{marginLeft:'27px'}} />
                            </Grid>
                            <Grid style={{ margin: '32px', right: '0px', display:'flex',justifyContent:'center'}}>
                                <Button variant="contained" color='primary' style={{backgroundColor: '#32441c'}} onClick={this.onCreatejob} >Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                
            );
        }
    }

}
export default CreateJobForm;
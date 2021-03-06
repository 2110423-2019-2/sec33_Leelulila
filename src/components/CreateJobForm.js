import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button, Grid } from '@material-ui/core';
// import fire from '../config/Fire';
import { Redirect } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import CheckBox from '../components/CheckBox';
import fire from '../config/firebase';
import CryptoJS from "crypto-js";
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
            redirect: false,
            tags: []
        }
    }

    check = order => {
        //console.log(order)        
        var i;
        var tags = [0,0,0,0,0,0,0,0,0,0]
        //console.log(order['Male'], 'maleeee')        
        if (order['Male'] == true) tags[0] = 1;
        else tags[0] = 0;
        if (order['Female'] == true) tags[1] = 1;
        else tags[1] = 0;
        if (order['Day'] == true) tags[2] = 1;
        else tags[2] = 0;
        if (order['Night'] == true) tags[3] = 1;
        else tags[3] = 0;
        if (order['Food'] == true) tags[4] = 1;
        else tags[4] = 0;
        if (order['Academic'] == true) tags[5] = 1;
        else tags[5] = 0;
        if (order['TechMechanic'] == true) tags[6] = 1;
        else tags[6] = 0;
        if (order['ArtMusic'] == true) tags[7] = 1;
        else tags[7] = 0;
        if (order['Activity'] == true) tags[8] = 1;
        else tags[8] = 0;
        if (order['Others'] == true) tags[9] = 1;
        else tags[9] = 0;
        this.state.tags = tags
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




    //push data to mongoDB
    onCreatejob() {
        let timer = null;
        //get all data from element below
        var data = {
            JobName: document.getElementById('jobname').value,
            JobDetail: document.getElementById('jobdescription').value,
            Wages: (document.getElementById('wages').value),
            Amount: (document.getElementById('amount').value),
            Location: document.getElementById('location').value,
            BeginTime: document.getElementById('timebegin').value,
            EndTime: document.getElementById('timeend').value,
            Date: document.getElementById('workDate').value,
            CurrentEmployee: [],
            CurrentAcceptedEmployee: [],
            Employer: fire.auth().currentUser.email,
            Status: "Ready",
            TFvector: this.state.tags
        }

        var invalidInput = ["null", "undefined"];
        if (data.JobName.length == 0 || data.JobDetail.length == 0 || data.Wages.length == 0 || data.Amount.length == 0 || data.Location.length == 0) {
            alert("Please fill the Empty Box")
        }
        else if(invalidInput.includes(data.JobName) || invalidInput.includes(data.JobDetail) || invalidInput.includes(data.Location)) alert("Input can't be null or undefined")
        else if(data.JobName.length > 30 || data.JobDetail.length > 100 || data.Location.length > 30) alert("Jobname length must be less than 30");
        else if(data.JobDetail.length > 100) alert("Job detail length must be less than 100");
        else if(data.Location.length > 30) alert("Job location length must be less than 30");
        else if((parseInt(data.Wages) < 1 && parseInt(data.Wages) > 10001) || (typeof parseInt(data.Wages) !== "number")) alert("Wage must be in range of 1-10,000 Baht")
        else if((parseInt(data.Amount) < 1 && parseInt(data.Amount) > 101) || (typeof parseInt(data.Amount) !== "number")) alert("Amount of employees must be in range of 1-100 people/job")
        else if(data.EndTime <= data.BeginTime) alert("Job end time must be more than Job start time")
        else {
            alert("Your job is being added!")
            //this function will push data to db
            this.mongoCreateJob(data);
            timer = setTimeout(() => this.setState({ redirect: true }), 500)

        }

    }



    mongoCreateJob(data) {
        //send request data to backend /newjob ***pull the lastest backend first***
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123456').toString();
        let sending_data = {data: ciphertext};
        fetch("/api/jobs", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sending_data) //To push data via htmlRequest, data must be send in form of string so use Stringify to make obj to string
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (resData) {
            // console.log(resData); 
            alert("Success!!");

        }).catch(function (err) {
            console.log(err);
        });

    }

    render() {
        const { redirect } = this.state;

        let today = new Date();
        let currentDate = new Date().toISOString();
        let currentDay = currentDate.substr(0, 10);
        let currentTime = today.toTimeString().substr(0,5);
        today.setHours(today.getHours() + 1);
        let nextTime = today.toTimeString().substr(0,5);

        if (redirect) {
            return <Redirect to='/Dashboard' />;
        }
        if (!this.state.checkCreatejob) {
            return (

                <div style={{ marginTop: '100px', marginBottom: '100px', paddingLeft: '25%' }}>
                    <h1>Create Job</h1>
                    <form>
                        <Grid xs={12} md={8}>
                            <Grid style={{ margin: '16px', display: 'flex', direction: 'column' , width: "780px"}}>
                                <h3> Jobname : </h3>
                                <TextField inputProps={{ maxLength: 30 }} name='Jobname' id="jobname" color="primary" variant="outlined" style={{ marginLeft: '20px', width: '300px' }} />
                                <h3 style={{ "padding-left": "20px" }}>Number of Employee :</h3>
                                <TextField name='people' color="primary" id='amount' label="Limited Person" variant="outlined" type='number' style={{ marginLeft: '16px', width: '178px' }} />
                            </Grid>
                            <Grid style={{ margin: '16px' }}>
                                <h3>Details :</h3>
                                <TextField multiline={true} rows={5} color="primary" name='detail' id="jobdescription" variant="outlined" margin='dense' style={{ width: 794 }} />
                            </Grid>
                            <Grid style={{ margin: '16px', display: 'flex', direction: 'column', marginTop: '40px', marginRight: "14px" }}>
                                <h3>Time :</h3>
                                <DatePicker
                                    id='timebegin'
                                    label="Start time"
                                    type='time'
                                    // value={this.state.selectedBegintime}
                                    // onChange={this.handleBeginTimeChange}
                                    defaultValue={currentTime}
                                    inputProps={{ min: '07:00' }}
                                />

                                <h3>to</h3>
                                <DatePicker
                                    id='timeend'
                                    label="End time"
                                    type='time'
                                    // value={this.state.selectedEndtime}
                                    // onChange={this.handleEndTimeChange}
                                    defaultValue={nextTime}
                                    inputProps={{ min: '08:00' }}
                                />
                                <TextField name='location' color="primary" id='location' label="Location" variant="outlined" style={{ marginLeft: '25px' }} />
                            </Grid>
                            <Grid style={{ margin: '16px', display: 'flex', direction: 'column' }}>
                                <h3>Date :</h3>
                                <DatePicker
                                    id='workDate'
                                    label="Select Work Date"
                                    type='date'
                                    defaultValue={currentDay}
                                    inputProps={{ min: currentDay }}

                                />
                                <TextField name='wages' color="primary" id='wages' label="Wages (Baht)" variant="outlined" type='number' style={{ marginLeft: '27px' }} />
                            </Grid>
                            <CheckBox
                                id='CheckBox'
                                check={this.check}
                            />
                            <Grid style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color='primary' style={{ backgroundColor: '#2a3649' }} onClick={this.onCreatejob} >Submit</Button>
                            </Grid>
                        </Grid>

                    </form>
                </div>

            );
        }
    }

}
export default CreateJobForm;
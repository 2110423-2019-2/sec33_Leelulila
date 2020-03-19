import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button, Grid } from '@material-ui/core';
// import fire from '../config/Fire';
import { Redirect } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import fire from '../config/firebase';

class CreateBlogForm extends Component {

    constructor(props) {
        super(props);
        this.onCreateBlog = this.onCreateBlog.bind(this);
        this.state = {
            User: {},
            redirect: false
        }
    }

    onCreateBlog() {
        console.log("Create Blog success");
    }



    //push data to mongoDB
    onCreatejob() {
        let timer = null;
        //get all data from element below
        var data = {
            BlogName: document.getElementById('blogname').value,
            BlogDetail: document.getElementById('detail').value,
            BlogTopic: document.getElementById('topic').value,
            Employer: fire.auth().currentUser.email,
            Status: "Ready"
        }
        if (data.BlogName.length == 0 || data.BlogDetail.length == 0 || data.BlogTopic.length ==0) {
            alert("Please fill the Empty Box")
        }
        else {
            alert("Your blog is being added!")
            //this function will push data to db
            this.mongoCreateJob(data);
            timer = setTimeout(() => this.setState({ redirect: true }), 500)

        }

    }



    mongoCreateJob(data) {
        
        fetch("/newblog", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) //To push data via htmlRequest, data must be send in form of string so use Stringify to make obj to string
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

        return (

            <div style={{ marginTop: '100px', marginBottom: '100px', paddingLeft: '25%' }}>
                <h1>Create Blog</h1>
                <form>
                    <Grid xs={12} md={8}>
                        <Grid style={{ margin: '16px', display: 'flex', direction: 'column' }}>
                            <h3> Title : </h3>
                            <TextField inputProps={{ maxLength: 30 }} name='Blogname' id="blogname" color="primary" variant="outlined" margin='dense' style={{ marginLeft: '20px', width: '300px' }} />
                            <h3 style={{ "padding-left": "20px" }}>Topic :</h3>
                            <TextField inputProps={{ maxLength: 15 }} name='Topic' color="primary" id='topic' variant="outlined" margin='dense' style={{ marginLeft: '16px', width: '178px' }} />
                        </Grid>
                        <Grid style={{ margin: '16px' }}>
                            <h3> Body :</h3>
                            <TextField multiline={true} rows={10} color="primary" name='detail' id="detail" variant="outlined" margin='dense' style={{ width: '794px'}} />
                        </Grid>
                        <Grid style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color='primary' style={{ backgroundColor: '#2a3649' }} onClick={this.onCreatejob} >Create Blog</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>

        );
    }
}


export default CreateBlogForm;
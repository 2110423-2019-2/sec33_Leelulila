import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button, Grid } from '@material-ui/core';
// import fire from '../config/Fire';
import fire from '../config/firebase';
import TopicSelecter from './TopicSelector';
import CryptoJS from "crypto-js";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {Redirect} from 'react-router-dom'

class CreateReviewForm extends Component {

    constructor(props) {
        super(props);
        this.JobName = props.JobName;
        this.onCreateReview = this.onCreateReview.bind(this);
        this.state = {
            User: {},
            redirect: false,
            rating: 0,
        }
    }

    //push data to mongoDB
    onCreateReview() {
        let timer = null;
        //get all data from element below
        var data = {
            JobName: this.JobName,
            ReviewDetail: document.getElementById('detail').value,
            Rating: this.state.rating,
            Writer: fire.auth().currentUser.email,
            Status: "Ready"
        }

        if (data.ReviewDetail.length == 0 || data.Rating.length == 0) {
            alert("Please fill the Empty Box")
        }
        else {
            alert("Your review is being added!")
            //this function will push data to db
            this.mongoCreateReview(data);
            timer = setTimeout(() => this.setState({ redirect: true }), 500)

        }

    }



    mongoCreateReview(data) {
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '123456').toString();
        let sending_data = { data: ciphertext };
        fetch("/api/reviews", {
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

        }).catch(function (err) {
            console.log(err);
        });

    }

    SimpleRating() {

        return (
            <div>
                <h3>Rate this job :</h3>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                        name="simple-controlled"
                        size="large"
                        id='rating'
                        precision={0.5}
                        value={this.state.rating}
                        onChange={(event, newValue) => {
                            this.setState({ rating: newValue });
                        }}
                    />
                </Box>
            </div>
        );
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            window.location.reload();
        } else {

            return (

                <div>
                    <h1>Create Review</h1>
                    <form>
                        <Grid style={{ margin: '10px' }}>
                            {this.SimpleRating()}
                            <h3> Detail :</h3>
                            <TextField multiline={true} rows={10} color="primary" name='detail' id="detail" variant="outlined" margin='dense' style={{ width: '620px' }} />
                        </Grid>
                        <Grid style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color='primary' style={{ backgroundColor: '#2a3649' }} onClick={this.onCreateReview} >Submit Review</Button>
                        </Grid>

                    </form>
                </div>

            );
        }
    }
}


export default CreateReviewForm;
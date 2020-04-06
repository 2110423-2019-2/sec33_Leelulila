import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import fire from '../config/firebase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ReviewActionMenu from './ReviewActionMenu';
import Rating from '@material-ui/lab/Rating';

class ReviewPost extends Component {

    constructor(props) {
        super(props);

        this.JobName = props.JobName;
        this.ReviewDetail = props.ReviewDetail;
        this.Rating = props.Rating;
        this.timestamp = props.timestamp;
        this.editable = props.editable;
        this.Writer = props.Writer;
        this.id = props.id;

        this.render = this.render.bind(this)
        this.getProfile.bind(this)

        this.state = {
            user: '',
        }
    }

    convertTime() {
        var t = new Date(this.timestamp);
        return t.toLocaleString()
    }

    getProfile() {
        let self = this;
        fetch("/api/users/useremail/" + self.Writer, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (jsonData) {
            // console.log(jsonData.firstName)
            self.setState({ user: jsonData.firstName + ' ' + jsonData.lastName });

        }).catch(function (err) {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getProfile();
    }

    onViewProfile(email) {
        window.location.href = `/noeditprofile?email=${email}`;
    }

    render() {
        if (!this.editable) {
            return (
                <Card id="ListingJobForm" style={{ marginTop: '60px', width: '800px', backgroundColor: '#EEEEEE', alignItems: 'center' }}>
                    <div>


                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1 class='titlename'>{this.JobName}</h1>
                        </div>
                        <Card style={{ marginRight: '40px', marginLeft: '40px', backgroundColor: 'white' }}>
                            <Grid style={{ display: 'flex', direction: 'column', marginLeft: '20px' }}>
                                <h4>Rating :</h4>
                                <Rating name="read-only" precision={0.5} value={this.Rating} readOnly style={{ marginLeft: '10px', marginTop: '15px' }} />
                            </Grid>
                            <div style={{ marginRight: '20px', marginLeft: '20px', display: 'flex', justifyContent: 'left' }}>
                                <h4>{this.ReviewDetail}</h4>
                            </div>
                        </Card>
                        <Grid style={{ display: 'flex', marginTop: '30px', direction: 'column' }}>
                            <p>Posted on {this.convertTime()} by</p>
                            <IconButton onClick={() => this.onViewProfile(this.Writer)}>
                                <AccountCircleIcon />
                            </IconButton>
                            <p>{this.state.user}</p>
                        </Grid>

                    </div>
                </Card>
            );
        } else {
            return (
                <Card id="ListingJobForm" style={{ marginTop: '60px', width: '800px', backgroundColor: '#EEEEEE', alignItems: 'center' }}>
                    <div>

                        <Grid style={{ display: 'flex', direction: 'column' }}>

                            <Grid xs={11} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <h1>{this.JobName}</h1>
                            </Grid>
                            <Grid xs={1} style={{ marginTop: '30px' }} >
                                <ReviewActionMenu JobName={this.JobName} id={this.id} Rating={this.Rating} ReviewDetail={this.ReviewDetail} />
                            </Grid>
                        </Grid>
                        <Card style={{ marginRight: '40px', marginLeft: '40px', backgroundColor: 'white' }}>
                            <Grid style={{ display: 'flex', direction: 'column', marginLeft: '20px' }}>
                                <h4>Rating :</h4>
                                <Rating name="read-only" precision={0.5} value={this.Rating} readOnly style={{ marginLeft: '10px', marginTop: '15px' }} />
                            </Grid>
                            <div style={{ marginRight: '20px', marginLeft: '20px', display: 'flex', justifyContent: 'left' }}>
                                <h4>{this.ReviewDetail}</h4>
                            </div>
                        </Card>
                        <Grid style={{ display: 'flex', marginTop: '30px', direction: 'column' }}>
                            <p>Posted on {this.convertTime()} by</p>
                            <IconButton onClick={() => this.onViewProfile(this.Writer)}>
                                <AccountCircleIcon />
                            </IconButton>
                            <p>{this.state.user}</p>
                        </Grid>

                    </div>
                </Card>
            );
        }
    }

}
ReviewPost.propTypes = {
    JobName: PropTypes.string,
    ReviewDetail: PropTypes.string,
    Writer: PropTypes.string,
    timestamp: PropTypes.string,
    Rating: PropTypes.number
}
export default ReviewPost;
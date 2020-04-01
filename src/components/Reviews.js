import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import '../style.css';
import axios from 'axios';
// import { Button, Grid } from '@material-ui/core';
import fire from '../config/firebase';
import ReviewPost from './ReviewPost'
// import Review from '../pages/Review';

import cookie from 'react-cookie'

class Reviews extends Component {

    constructor(props) {
        super(props);

        // this.BlogName = props.BlogName;
        // this.BlogDetail = props.BlogDetail;
        // this.BlogTopic = props.BlogTopic;
        // this.BlogImage = props.BlogImage;
        // this.Employer = props.Employer;
        // this.timestamp = props.timestamp;
        this.yourPage = props.yourPage;

        this.state = {
            // checkgetBlogalready: false,
            currentReviews: [],
            listing: [],
            ready: false,
            yourReview: [],

        }
        this.getAllReview = this.getAllReview.bind(this)

        this.token = 'Bearer '.concat(cookie.load('jwt'));
    }

    componentDidMount() {
        this.getAllReview();
    }

    getAllReview() {
        let self = this;
        axios.get('http://localhost:9000/allreview',
        {
            "headers": {
                'Authorization': this.token
            }
        }
        )
            .then(response => {
                self.setState({
                    listing: response.data,
                })
                var list2 = [];
                var list3 = [];
                var user = fire.auth().currentUser.email;
                for (var x in self.state.listing.reverse()) {
                    if (self.state.listing[x]['Status'] == "Ready") {
                        list2.push(self.state.listing[x]);
                    }
                    if (self.state.listing[x]['Writer'] == user) {
                        list3.push(self.state.listing[x]);
                    }
                }
                self.setState({
                    currentReviews: list2,
                    ready: false,
                    yourReview: list3,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (!this.yourPage) {
            if (this.state.currentReviews.length==0) {
                return (
                    <h2 style={{marginTop:'30px'}}>There is no review...</h2>
                );
            } else {
                return (
                    this.state.currentReviews.map((notes, key) => {
                        // console.log(notes._id)


                        return (

                            <div key={notes._id} style={{ display: 'flex', justifyContent: 'center' }}>
                                <ReviewPost
                                    JobName={notes.JobName}
                                    ReviewDetail={notes.ReviewDetail}
                                    Writer={notes.Writer}
                                    timestamp={notes.timestamp}
                                    editable={false}
                                    Rating={notes.Rating}
                                />
                            </div>

                        );
                    })
                );
            }

        } else {
            if (this.state.yourReview.length==0){
                return (
                    <h2 style={{marginTop:'30px'}}>You don't have any review...</h2>
                );
            }else{
                return (
                    this.state.yourReview.map((notes, key) => {
                        console.log(notes._id)
    
    
                        return (
    
                            <div key={notes._id} style={{ display: 'flex', justifyContent: 'center' }}>
                                <ReviewPost
                                    JobName={notes.JobName}
                                    ReviewDetail={notes.ReviewDetail}
                                    Writer={notes.Writer}
                                    timestamp={notes.timestamp}
                                    editable={true}
                                    Rating={notes.Rating}
                                    id={notes._id}
                                />
                            </div>
    
                        );
                    })
                );
            }
            
        }
    }
}
export default Reviews;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.css';
import axios from 'axios';
import Post from './Post';
import { Button, Grid } from '@material-ui/core';
import fire from '../config/firebase';

import cookie from 'react-cookie'

class BlogPosts extends Component {

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
            currentBlogs: [],
            listing: [],
            ready: false,
            yourBlog: [],

        }
        this.getAllBlog = this.getAllBlog.bind(this)
        this.token = 'Bearer '.concat(cookie.load('jwt'));
    }

    componentDidMount() {
        this.getAllBlog();
    }

    getAllBlog() {
        let self = this;
        axios.get('http://localhost:9000/api/blogs',
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
                    if (self.state.listing[x]['Employer'] == user) {
                        list3.push(self.state.listing[x]);
                    }
                }
                self.setState({
                    currentBlogs: list2,
                    ready: false,
                    yourBlog: list3,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (!this.yourPage) {
            if (this.state.currentBlogs.length==0) {
                return (
                    <h2 style={{marginTop:'30px'}}>There is no blog...</h2>
                );
            } else {
                return (
                    this.state.currentBlogs.map((notes, key) => {
                        // console.log(notes._id)


                        return (

                            <div key={notes._id} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Post BlogName={notes.BlogName}
                                    BlogDetail={notes.BlogDetail}
                                    BlogTopic={notes.BlogTopic}
                                    BlogImage={notes.BlogImage}
                                    Employer={notes.Employer}
                                    timestamp={notes.timestamp}
                                    editable={false}
                                    id={notes._id}
                                    comments={notes.comments}
                                />
                            </div>

                        );
                    })
                );
            }

        } else {
            if (this.state.yourBlog.length==0){
                return (
                    <h2 style={{marginTop:'30px'}}>You don't have any blog...</h2>
                );
            }else{
                return (
                    this.state.yourBlog.map((notes, key) => {
                        console.log(notes._id)
    
    
                        return (
    
                            <div key={notes._id} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Post BlogName={notes.BlogName}
                                    BlogDetail={notes.BlogDetail}
                                    BlogTopic={notes.BlogTopic}
                                    BlogImage={notes.BlogImage}
                                    Employer={notes.Employer}
                                    timestamp={notes.timestamp}
                                    editable={true}
                                    comments={notes.comments}
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
export default BlogPosts;
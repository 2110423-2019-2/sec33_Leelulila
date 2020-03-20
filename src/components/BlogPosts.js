import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.css';
import axios from 'axios';
import Post from './Post';
import { Button, Grid } from '@material-ui/core';

class BlogPosts extends Component {

    constructor(props) {
        super(props);

        // this.BlogName = props.BlogName;
        // this.BlogDetail = props.BlogDetail;
        // this.BlogTopic = props.BlogTopic;
        // this.BlogImage = props.BlogImage;
        // this.Employer = props.Employer;
        // this.timestamp = props.timestamp;

        this.state = {
            // checkgetBlogalready: false,
            currentBlogs: [],
            listing: [],
            ready: false,

        }
        this.getAllBlog = this.getAllBlog.bind(this)
    }

    componentDidMount() {
        this.getAllBlog();
    }

    getAllBlog() {
        let self = this;
        axios.get('http://localhost:9000/allblog')
            .then(response => {
                self.setState({
                    listing: response.data,
                })
                var list2 = [];
                for (var x in self.state.listing) {
                    if (self.state.listing[x]['Status'] == "Ready") {
                        list2.push(self.state.listing[x]);
                    }
                }
                self.setState({
                    currentBlogs: list2,
                    ready: false,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            this.state.currentBlogs.map((notes, key) => {
                console.log(notes.BlogName)


                return (

                    <div key={notes._id} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Post BlogName={notes.BlogName}
                            BlogDetail={notes.BlogDetail}
                            BlogTopic={notes.BlogTopic}
                            BlogImage={notes.BlogImage}
                            Employer={notes.Employer}
                            timestamp={notes.timestamp}
                        />
                    </div>

                );
            })
        );
    }
}
export default BlogPosts;
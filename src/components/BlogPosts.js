import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.css';
import axios from 'axios';

class BlogPosts extends Component {

    constructor(props) {
        super(props);

        this.BlogName = props.BlogName;
        this.BlogDetail = props.BlogDetail;
        this.BlogTopic = props.BlogTopic;
        this.BlogImage = props.BlogImage;
        this.Employer = props.Employer;
        this.timestamp = props.timestamp;

        this.state = {
            checkgetBlogalready: false,
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
                console.log('success');
                self.setState({
                    listing: response.data,
                })
                var list2 = [];
                for (var x in self.state.listing) {
                    if (self.state.listing[x]['Status'] == "Ready") {
                        list2.push(x);
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
        console.log(this.state.currentBlogs)
        return (
            <div>
                <h1>test</h1>
            </div>
        );
    }
}
export default BlogPosts;
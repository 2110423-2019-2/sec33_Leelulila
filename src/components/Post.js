import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import fire from '../config/firebase';

class Post extends Component {

    constructor(props) {
        super(props);

        this.BlogName = props.BlogName;
        this.BlogDetail = props.BlogDetail;
        this.BlogTopic = props.BlogTopic;
        this.BlogImage = props.BlogImage;
        this.Employer = props.Employer;
        this.timestamp = props.timestamp;

        this.render = this.render.bind(this)
    }

    addDefaultSrc(ev) {
        ev.target.src = 'https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png'
    }

    convertTime() {
        // var t = new Date(this.timestamp * 1000);
        // var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
        // console.log(formatted)
        // return formatted;
        var t = new Date(this.timestamp);
        return t.toLocaleString()
    }

    render() {
        return (
            <Card id="ListingJobForm" style={{ marginTop: '60px', width: '800px', backgroundColor: '#EEEEEE', borderRadius: '3%', alignItems: 'center' }}>
                <div>


                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>{this.BlogName}</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                        <h3>Topic : {this.BlogTopic}</h3>
                    </div>
                    <Card style={{ marginRight: '40px', marginLeft: '40px', backgroundColor: 'white', borderRadius: '3%' }}>
                        <div style={{ marginTop: '30px', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                style={{ width: '60%', height: '60%' }}
                                src={this.BlogImage}
                                alt="new"
                                onError={this.addDefaultSrc}

                            />
                        </div>
                        <div style={{ marginRight: '20px', marginLeft: '20px', display: 'flex', justifyContent: 'left' }}>
                            <h4>{this.BlogDetail}</h4>
                        </div>
                    </Card>
                    <div style={{ marginTop: '30px'}}> 
                        <p>Posted on {this.convertTime()} by {this.Employer}</p>
                    </div>

                </div>
            </Card>
        );

    }

}
Post.propTypes = {
    BlogName: PropTypes.string,
    BlogDetail: PropTypes.string,
    BlogTopic: PropTypes.string,
    BlogImage: PropTypes.string,
    Employer: PropTypes.string,
    timestamp: PropTypes.string,
}
export default Post;
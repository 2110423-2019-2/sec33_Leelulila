import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import JobCardModal from '../components/JobCardModal'
import CommentBox from '../components/CommentBox'
import Comments from '../components/Comments'
import fire from '../config/firebase';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments
        }
        this.id = props.id;
        this.BlogName = props.BlogName;
        this.BlogDetail = props.BlogDetail;
        this.BlogTopic = props.BlogTopic;
        this.BlogImage = props.BlogImage;
        this.Employer = props.Employer;
        this.timestamp = props.timestamp;

        this.render = this.render.bind(this);
        this.addComment.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
    }

    componentDidMount() {
    }

    addDefaultSrc(ev) {
        ev.target.src = 'https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png'
    }

    addComment(comment) {
        console.log('addcomment')
        let self = this;
        fetch("/blog/newcomment/" + this.id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (resData) {
            window.location.reload()

        }).catch(function (err) {
            console.log(err);
        });
    }

    handleAddComment(comment) {
        let self = this;
        self.addComment(comment);
    }



    render() {

        console.log(this.state, 'state')

        return (
            <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <Card alignItems='center' id="ListingJobForm" style={{
                    marginBottom: '50px', marginTop: '50px', height: 'auto', width: '60%',
                    backgroundColor: '#FFFFFF', opacity: '80%', alignItems: 'center', padding: '0px'
                }}>
                    <div>
                        <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item md={10}>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <h2>{this.BlogName}</h2>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>Topic : {this.BlogTopic}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img
                                        src={this.BlogImage}
                                        alt="new"
                                        style={{ width: 400, height: 300 }}
                                        onError={this.addDefaultSrc}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>{this.BlogDetail}</p>
                                </div>
                                {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <p> : {this.timestamp}</p>
                            </div> */}
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>Writer : {this.Employer}</p>
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                    <Card alignItems='center' style={{ backgroundColor: '#E6E6E6', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2 style={{ display: 'flex', paddingLeft: '10%' }}> Comments &nbsp;</h2>
                            <InsertCommentIcon />
                        </div>
                        <Grid style={{ display: 'flex', paddingLeft: '10%' }}>
                            <Comments comments={this.state.comments} />
                        </Grid>
                        <Grid style={{ display: 'flex', paddingLeft: '10%' }}>
                            <CommentBox handleAddComment={this.handleAddComment} />
                        </Grid>
                    </Card>
                </Card>
            </div>
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
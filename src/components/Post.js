import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import JobCardModal from '../components/JobCardModal'
import fire from '../config/firebase';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

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


    render() {

        return (
            <Card alignItems='center' id="ListingJobForm" style={{ marginBottom: '50px', marginTop: '50px', height: '600px', backgroundColor: 'white', opacity: '80%', borderRadius: '3%', alignItems: 'center' }}>
                <div>
                    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item md={12}>

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
import React, { Component } from 'react';
import { InputLabel, InputBase, Card, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../style.css';
import { Redirect } from 'react-router-dom';
import fire from '../config/firebase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import PostActionMenu from './PostActionMenu';

class Post extends Component {

    constructor(props) {
        super(props);

        this.BlogName = props.BlogName;
        this.BlogDetail = props.BlogDetail;
        this.BlogTopic = props.BlogTopic;
        this.BlogImage = props.BlogImage;
        this.Employer = props.Employer;
        this.timestamp = props.timestamp;
        this.editable = props.editable;
        this.id = props.id;

        this.render = this.render.bind(this)
        this.getProfile.bind(this)

        this.state = {
            user: '',
        }
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

    getProfile() {
        let self = this;
        fetch("/useremail/" + self.Employer, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (jsonData) {
            // console.log(jsonData.firstName)
            var user2 = fire.auth().currentUser.email;
            if (user2 == self.Employer) {
                self.setState({ user: 'Me' })
            } else {
                self.setState({ user: jsonData.firstName });
            }

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
                <Card id="ListingJobForm" style={{ marginTop: '60px', width: '800px', backgroundColor: '#EEEEEE', borderRadius: '3%', alignItems: 'center' }}>
                    <div>


                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>{this.BlogName.toUpperCase()}</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '30px' }}>
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
                        <Grid style={{ display: 'flex', marginTop: '30px', direction: 'column' }}>
                            <p>Posted on {this.convertTime()} by</p>
                            <IconButton onClick={() => this.onViewProfile(this.Employer)}>
                                <AccountCircleIcon />
                            </IconButton>
                            <p>{this.state.user}</p>
                        </Grid>

                    </div>
                </Card>
            );
        } else {
            return (
                <Card id="ListingJobForm" style={{ marginTop: '60px', width: '800px', backgroundColor: '#EEEEEE', borderRadius: '3%', alignItems: 'center' }}>
                    <div>

                        <Grid style={{ display: 'flex', direction: 'column' }}>

                            <Grid xs={11} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <h1>{this.BlogName.toUpperCase()}</h1>
                            </Grid>
                            <Grid xs={1} style={{ marginTop: '30px' }} >
                                <PostActionMenu id={this.id} />
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '30px' }}>
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
                        <Grid style={{ display: 'flex', marginTop: '30px', direction: 'column' }}>
                            <p>Posted on {this.convertTime()} by</p>
                            <IconButton onClick={() => this.onViewProfile(this.Employer)}>
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
Post.propTypes = {
    BlogName: PropTypes.string,
    BlogDetail: PropTypes.string,
    BlogTopic: PropTypes.string,
    BlogImage: PropTypes.string,
    Employer: PropTypes.string,
    timestamp: PropTypes.string,
}
export default Post;
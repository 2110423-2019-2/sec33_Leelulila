import React, { Component } from 'react';
import CommentBox from '../components/CommentBox';
import Comments from '../components/Comments';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import WorkIcon from '@material-ui/icons/Work';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Reviews from '../components/Reviews'

class Review extends Component {
    constructor(props) {
        super(props);

        this.handleAddComment = this.handleAddComment.bind(this);
        this.state = {
            comments: [],
            user: {}
        }
    }

    componentDidMount() {
        /* global Ably */
        const channel = Ably.channels.get('comments');

        channel.attach();
        channel.once('attached', () => {
            channel.history((err, page) => {
                /* create a new array with comments */
                const comments = Array.from(page.items, item => item.data);

                this.setState({ comments });

                /* subscribe to new comments */
                channel.subscribe((msg, err) => {
                    const commentObject = msg['data'];
                    this.handleAddComment(commentObject);
                });
            });
        });
    }

    handleAddComment(comment) {
        this.setState(prevState => {
            return {
                comments: [comment].concat(prevState.comments)
            };
        });
    }

    render() {
        return (

            <div className="container" style={{ marginTop: '100px', marginLeft: '10%', width: '80%', marginButtom: '100px' }}>
                <h1>Job Review</h1>
                <Grid container>
                    <Grid item xs={2} style={{ direction: 'column' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DashboardIcon />}
                            style={{ marginRight: '30px', fontOpticalSizing: "auto" }}
                            href='/Blog'
                        >
                            Blogs Feeds
                </Button>
                    </Grid>
                    <Grid item xs={2} style={{ direction: 'column' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AccountBoxIcon />}
                            style={{  fontOpticalSizing: "auto" }}
                            href='/YourReview'
                        >
                            Your Review (s)
                </Button>
                    </Grid>
                </Grid>
                <Reviews yourPage={false} />
            </div>

        );
    }
}

export default Review;

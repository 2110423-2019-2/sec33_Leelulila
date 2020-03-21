import React, { Component } from 'react';
import CommentBox from '../components/CommentBox';
import Comments from '../components/Comments';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import WorkIcon from '@material-ui/icons/Work';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CreateBlogModal from '../components/CreateBlogModal'
import BlogPosts from '../components/BlogPosts'

class Blog extends Component {
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
                <h1>Blog</h1>
                <Grid container>
                    <Grid item xs={2} style={{ direction: 'column' }}>
                        <CreateBlogModal />
                    </Grid >
                    <Grid item xs={2} style={{ direction: 'column' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AccountBoxIcon />}
                            style={{ marginRight: '30px' }}
                            href='/yourBlog'
                        >
                            Your Blog (s)
                </Button>
                    </Grid>
                    <Grid item xs={2} style={{ direction: 'column' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<WorkIcon />}
                            style={{ marginRight: '30px' }}
                        >
                            Job Review
                </Button>
                    </Grid>
                </Grid>
                {/* <div className="columns">
                    <div className="column is-half is-offset-one-quarter" style={{ display: 'flex', justifyContent: 'center' }}>
                        <CommentBox handleAddComment={this.handleAddComment} />
                        <Comments comments={this.state.comments} />
                    </div>
                </div> */}
                <BlogPosts yourPage={false}/>
            </div>

        );
    }
}

export default Blog;

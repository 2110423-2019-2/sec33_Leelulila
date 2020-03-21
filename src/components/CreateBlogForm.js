import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button, Grid } from '@material-ui/core';
// import fire from '../config/Fire';
import fire from '../config/firebase';
import TopicSelecter from './TopicSelector';

class CreateBlogForm extends Component {

    constructor(props) {
        super(props);
        this.onCreateBlog = this.onCreateBlog.bind(this);
        this.state = {
            User: {},
            redirect: false
        }
    }

    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str);
    }

    //push data to mongoDB
    onCreateBlog() {
        let timer = null;
        //get all data from element below
        var data = {
            BlogName: document.getElementById('blogname').value.toUpperCase(),
            BlogDetail: document.getElementById('detail').value,
            BlogTopic: document.getElementById('topic').value,
            BlogImage: document.getElementById('image').value,
            Employer: fire.auth().currentUser.email,
            Status: "Ready"
        }
        console.log(data)
        if (data.BlogName.length == 0 || data.BlogDetail.length == 0 || data.BlogImage.length == 0 || data.BlogTopic.length == 0) {
            alert("Please fill the Empty Box")
        }
        else if (!this.validURL(document.getElementById('image').value)) {
            alert("Please fill the valid URL")
        }
        else {
            alert("Your blog is being added!")
            //this function will push data to db
            this.mongoCreateBlog(data);
            timer = setTimeout(() => this.setState({ redirect: true }), 500)

        }

    }



    mongoCreateBlog(data) {

        fetch("/newblog", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) //To push data via htmlRequest, data must be send in form of string so use Stringify to make obj to string
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (resData) {
            // console.log(resData); 

        }).catch(function (err) {
            console.log(err);
        });

    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            window.location.reload();
        } else {

            return (

                <div>
                    <h1>Create Blog</h1>
                    <form>

                        <Grid style={{ margin: '16px', display: 'flex', direction: 'column' }}>
                            <h3> Title :</h3>
                            <TextField inputProps={{ maxLength: 30 }} name='Blogname' id="blogname" color="primary" variant="outlined" margin='dense' style={{ marginLeft: '20px', width: '250px' }} />
                            <h3 style={{ "padding-left": "20px" }}>Topic :</h3>
                            <TextField inputProps={{ maxLength: 20 }} name='Topic' color="primary" id='topic' variant="outlined" margin='dense' style={{ marginLeft: '16px', width: '200px' }} />
                            {/* <TopicSelecter id='topic' /> */}
                        </Grid>
                        <Grid style={{ margin: '16px' }}>
                            <h3> Image (URL) : </h3>
                            <TextField name='image' id="image" color="primary" variant="outlined" margin='dense' style={{ width: '620px' }} />
                        </Grid>
                        <Grid style={{ margin: '16px' }}>
                            <h3> Body :</h3>
                            <TextField multiline={true} rows={10} color="primary" name='detail' id="detail" variant="outlined" margin='dense' style={{ width: '620px' }} />
                        </Grid>
                        <Grid style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color='primary' style={{ backgroundColor: '#2a3649' }} onClick={this.onCreateBlog} >Create Blog</Button>
                        </Grid>

                    </form>
                </div>

            );
        }
    }
}


export default CreateBlogForm;
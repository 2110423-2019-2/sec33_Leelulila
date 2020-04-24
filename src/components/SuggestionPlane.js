import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Grid, Button, TextField, Input, Container } from '@material-ui/core';
import ListingJobForm from '../components/ListingJobForm'

const gridListStyle = {
    width: 350,
    height: 730,
    backgroundColor: '#EEEEEE'
};

class SuggestionPlane extends Component {



    constructor(props) {
        super(props);
        this.state = {
            db: props.db,
            user: props.user,
            TFvector: props.user['TFvector'],
            suggestJob: [],
            ready: false,
        }
    }

    componentDidMount() {
        var pendingJob = this.state.user['pendingJob']
        var currentJob = this.state.user['currentJob']
        var jobOwn = this.state.user['jobOwn']
        var jobs = this.state.db
        var userVector = this.state.TFvector
        // console.log(jobOwn, 'jobOwn')
        var similarity = require('compute-cosine-similarity');
        var noZrJobs = []
        jobs.forEach(function (job) {
            var jobVector = job[0]['TFvector']
            if (jobVector != undefined && userVector != undefined) var s = similarity(jobVector, userVector)
            else var s = 0
            job[0]['CosineValue'] = s
            if (s > 0 && !currentJob.includes(job[1][0]) && !pendingJob.includes(job[1][0]) && !jobOwn.includes(job[1][0])) noZrJobs.push(job)
        });
        noZrJobs.sort(function (a, b) {
            return b[0]['CosineValue'] - a[0]['CosineValue']
        })
        this.state.suggestJob = noZrJobs
        // console.log(this.state.suggestJob, 'suggest job')
        this.setState({ ready: true })
    }

    renderList() {
        if (this.state.ready && this.state.suggestJob.length > 0) {
            // console.log(this.state.suggestJob.length)
            return (
                this.state.suggestJob.map((notes, key) => {
                    var score = parseInt(notes[0]['CosineValue']*100)
                    return (
                        <div>
                            <ListSubheader component="div">{score}% from our prediction.</ListSubheader>
                            <ListingJobForm
                                JobName={notes[0]['JobName']}
                                JobDetail={notes[0].JobDetail}
                                Wages={notes[0].Wages}
                                Amount={notes[0].Amount}
                                Date={notes[0].Date}
                                BeginTime={notes[0].BeginTime}
                                EndTime={notes[0].EndTime}
                                Location={notes[0].Location}
                                Employer={notes[0].Employer}
                                CurrentEmployee={notes[0].CurrentEmployee}
                                CurrentAcceptedEmployee={notes[0].CurrentAcceptedEmployee}
                                WorkKey={notes[1][0]}
                                currentJob={this.state.user.currentJob}
                                TFvector={notes[0].TFvector}
                            />
                        </div>
                    )
                    // console.log("success")
                })
            )
        }
        else {
            // console.log('No Suggestion')
            return (
                <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                    <ListSubheader component="div">No suggestion, Try to apply some more jobs.</ListSubheader>
                </GridListTile>
            )
        }
    }

    render() {
        return (
            <div >
                <GridList cellHeight={800} cols={1} style={gridListStyle} >
                    <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                        <h1></h1>
                    </GridListTile>
                    <GridListTile cols={1} style={{ height: '10', paddingRight: '24px' }}>
                        {this.renderList()}
                    </GridListTile>
                </GridList>
            </div>
        );


    }

}
export default SuggestionPlane;
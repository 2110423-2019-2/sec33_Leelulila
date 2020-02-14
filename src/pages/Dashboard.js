import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { Grid, Button, TextField } from '@material-ui/core';
import JobCard from '../components/JobCard';

import '../style.css';
import ListingjobForm from '../components/ListingjobForm';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            listing: [],
        }
        // this.database = fire.database().ref("ListingJob");
        this.renderList = this.renderList.bind(this);
    }
    // componentDidMount() {
    //     this.database.on('value', snap => {
    //         var list2 = this.state.listing;
    //         for (var x in snap.val()) {
    //             list2.push(snap.val()[x]);

    //         }

    //         this.setState({
    //             listing: list2,
    //         })

    //     })
    // }
    renderList(){
        if (this.state.listing.length==0){
            return (
                <h1> dont have any job</h1>
            )
        }
        return (
            
                this.state.listing.map((notes) => {
                    return (
                        <div md={12}>
                            <ListingjobForm
                                Jobname={notes.Jobname}
                                Jobdes={notes.Jobdes}
                                Wages={notes.Wages}
                                Amount={notes.Amount}
                                Date={notes.Date}
                                Begintime={notes.Begintime}
                                Endtime={notes.Endtime}
                                Location={notes.Location}
                                Employee={notes.Employee}
                                Workkey={notes.Workkey}
                                Currentnumber={notes.Currentnumber}
                                Currentemployer={notes.Currentemployer}
                            />
                            <br />
                        </div>
                    )
                })
            
        )
    }
  
    render() {

        return (
            <div style={{ marginTop: '100px', marginLeft: '10%', width: '80%', marginButtom: '100px' }}>

                <h1>Welcome!! User</h1>
                <h1>Find Job</h1>
                <TextField id="filled-search" label="Search field" type="search" variant="outlined" fullWidth />
                <p>heve to make search real time</p>
                <div style={{ marginTop: '5%' }}>
                    <h1>Listing Job</h1>
                    
                </div>
                {this.renderList()}

            </div>);


    }
}



export default Dashboard;
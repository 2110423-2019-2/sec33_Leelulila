import React, { Component } from 'react';
import fire from '../config/Fire';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfilePic from '../pic/socialIcon/Palee4.png';
import CoverPic from '../pic/socialIcon/cover.jpg';
import Grid from '@material-ui/core/Grid';



class ProfileForm extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div class='ProfileHeader'>
                    <div class='ProfileImg'>
                        <img src={ProfilePic} />
                    </div>
                </div>

                <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CardContent style={{ marginTop: '40px', marginLeft: '40px' }}>
                        <div>
                            <Grid style={{ display: 'flex' }}>
                                <Grid item md={12}>
                                    <h1>Teeti Watanatada</h1>
                                    <p>Chulalongkorn University</p>
                                    <p>Computer Engineering</p>
                                    <p>Birth date:</p>
                                    <p>Gender:</p>
                                    <p>Email:</p>
                                </Grid>
                                <Grid item md={1}>
                                    <Button variant="contained">Edit</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>  
                <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CardContent style={{ marginLeft: '40px' }}>
                        <div>
                            <Grid style={{ display: 'flex' }}>
                                <Grid item md={12}>
                                    <p>Education:</p>
                                </Grid>
                                <Grid item md={1}>
                                    <Button variant="contained">Edit</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>
                <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CardContent style={{ marginLeft: '40px' }}>
                        <div>
                            <Grid style={{ display: 'flex' }}>
                                <Grid item md={12}>
                                    <p>Skill:</p>
                                </Grid>
                                <Grid item md={1}>
                                    <Button variant="contained">Edit</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>   
                <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CardContent style={{ marginLeft: '40px' }}>
                        <div>
                            <Grid style={{ display: 'flex' }}>
                                <Grid item md={12}>
                                    <p>About:</p>
                                </Grid>
                                <Grid item md={1}>
                                    <Button variant="contained">Edit</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>               
            </div>
        );


    }

}
export default ProfileForm;
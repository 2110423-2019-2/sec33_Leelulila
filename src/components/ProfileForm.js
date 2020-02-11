import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ProfilePic from '../pic/socialIcon/Palee4.png';
import Grid from '@material-ui/core/Grid';
import EditModal from '../components/EditModal';



class ProfileForm extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                <div class='ProfileHeader'>
                    <div class='ProfileImg'>
                        <img src={ProfilePic} />
                    </div>
                    <h1 style={{ "font-size": '3em', marginLeft: '50px', marginTop: '100px', marginBottom: '100px' }}>Teeti Watanatada</h1>
                </div>
                <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CardContent style={{ marginTop: '40px', marginLeft: '40px' }}>
                        <div>
                            <Grid style={{ display: 'flex' }}>
                                <Grid item md={12}>
                                    <h4>About Me:</h4>
                                </Grid>
                                <Grid item md={1}>
                                    <EditModal title="About Me" />
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>
                <Grid style={{ display: 'flex' }}>
                    <Grid item sm={4} style={{ marginLeft: '5px', marginRight: '5px' }}>
                        <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <CardContent style={{ marginLeft: '40px' }}>
                                <div>
                                    <Grid style={{ display: 'flex' }}>
                                        <Grid item md={9}>                                    
                                            <i class="fas fa-birthday-cake"></i>
                                            <h4>Birth date:</h4>
                                            <h4>Gender:</h4>
                                            <h4>Email:</h4>
                                        </Grid>
                                        <Grid item md={0}>
                                            <EditModal title='Information' />
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4} style={{ marginLeft: '5px', marginRight: '5px' }}>
                        <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <CardContent style={{ marginLeft: '40px' }}>
                                <div>
                                    <Grid style={{ display: 'flex' }}>
                                        <Grid item md={9}>
                                            <h4>Education:</h4>
                                        </Grid>
                                        <Grid item md={0}>
                                            <EditModal title='Education' />
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4} style={{ marginLeft: '5px', marginRight: '5px' }}>
                        <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <CardContent style={{ marginLeft: '40px' }}>
                                <div>
                                    <Grid style={{ display: 'flex' }}>
                                        <Grid item md={9}>
                                            <h4>Skill:</h4>
                                        </Grid>
                                        <Grid item md={0}>
                                            <EditModal title="Skill" />
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );


    }

}
export default ProfileForm;
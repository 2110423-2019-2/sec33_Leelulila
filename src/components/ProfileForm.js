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

    componentDidMount() {     
        // console.log(this.props.gender)
    }

    render() {
        return (
            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                <div class='ProfileHeader'>
                    <div class='ProfileImg'>
                        <img src={ProfilePic} />
                    </div>
        <h1 style={{ "font-size": '3em', marginLeft: '50px', marginTop: '100px', marginBottom: '100px' }}>{this.props.firstName}&nbsp;{this.props.lastName}</h1>
                </div>
                <Card style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CardContent style={{ marginTop: '40px', marginLeft: '40px' }}>
                        <div>
                            <Grid style={{ display: 'flex' }}>
                                <Grid item md={12}>
                                    <h4>About:</h4>
                                    <p id='about-text'>{this.props.about}</p>
                                </Grid>
                                <Grid item md={1}>
                                    <EditModal title="About" _id = {this.props._id} value ={this.props.about}/>
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
                                            <h4>Birthday:</h4><p>{this.props.birthday}</p>
                                            <h4>Gender:</h4><p>{this.props.gender}</p>
                                            <h4>Email:</h4><p>{this.props.email}</p>
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
                                            <p id='education-text'>{this.props.education}</p>
                                        </Grid>
                                        <Grid item md={0}>
                                            <EditModal title='Education' _id = {this.props._id} value ={this.props.education}/>
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
                                            <p id='skill-text'>{this.props.skill}</p>
                                        </Grid>
                                        <Grid item md={0}>
                                            <EditModal title="Skill" _id = {this.props._id} value ={this.props.skill} />
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
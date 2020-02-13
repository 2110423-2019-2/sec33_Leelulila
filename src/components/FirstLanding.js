import React from 'react';
import {Paper,Grid,Button} from '@material-ui/core';
import firstPic from '../pic/firstPic.png';
const FirstLanding = () => {
    return (
        <div>
            <Paper square elevation={0} fullWidth style={{marginTop:"70px",minHeight:'520px'}}>
                <Grid direction='row' container>
                    <Grid container item sm={12} md={6} xl={6} style={{marginTop:'20px'}}>
                        <img id='picFirstLanding' src={firstPic} width='600' height='400' style={{ marginLeft: "20%" }}/>
                    </Grid>
                    <Grid item sm={12} md={6} xl={6} style={{padding:'10px'}}>
                        <div style={{marginTop:'10%'}}>
                            <h1>WELCOME TO CU PART-TIME!</h1>
                            <h2>Discovering your talent in any career fields as you desire.</h2>
                            <p>CU PART-TIME is a platform to help you find jobs or activities based on your interests. Developed by a group of students that understand how hard it is to find jobs in real environment. By using this platfrom, you will be working with people who have the same passion in a friendly environment. We are here to improve your experience and skill in career fields. Thank you for choosing CU PART-TIME!
                            </p>
                        </div>
                    </Grid>
                
                </Grid>
            </Paper>
          
        </div>
    );
};

export default FirstLanding;
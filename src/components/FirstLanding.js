import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import firstPic from '../pic/firstPic.png';
import '../style.css';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    margin: {
        margin: theme.spacing(1),
        width: "170px"
    }
}));

const FirstLanding = () => {
    const classes = useStyles();

    return (
        <div className={classes.root} id='FirstLanding' style={{ padding: '40px', minHeight: '520px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                    <img
                        id='picFirstLanding'
                        src={firstPic}
                        style={{ width: '100%', marginLeft: '10%', marginTop: '10%' }} />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <div id='WelcomeText' className={classes.root} style={{ paddingTop: '10%' }}>
                        <h1 id='title'>WELCOME TO CU PART-TIME!</h1>
                        <h2>Discovering your talent in any career fields as you desire.</h2>
                        <p>CU PART-TIME is a platform to help you find jobs or activities based on your interests. Developed by a group of students that understand how hard it is to find jobs in real environment.
                        By using this platfrom, you will be working with people who have the same passion in a friendly environment. We are here to improve your experience and skill in career fields. Thank you for choosing CU PART-TIME!
                        </p>
                        <Button variant="contained" size="medium" color="primary" className={classes.margin} href="/register" style={{ backgroundColor: '#2a3649' }}>
                            Get Started
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
};

export default FirstLanding;
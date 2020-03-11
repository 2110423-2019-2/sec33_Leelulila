import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import Dashboard from './Dashboard';
//import Landing from './Landing';
import Button from '@material-ui/core/Button';
import ProfileBar from '../components/ProfileBar';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
//import Listingjob from './Listingjob';
import CreateJob from './Createjob';
import Profile from './Profile'
import Schedule from './Schedule'
import Footer from '../components/Footer';
import '../style.css';
import Dashboard from './Dashboard';
import JobOwned from './JobOwned';
import NoEditProfile from './NoEditProfile';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',

    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    toolbarStyle: {
        background: '#E3495A',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbarStyle}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button style={{maxWidth: '140px', maxHeight: '50px', minWidth: '140px', minHeight: '50px',backgroundColor:'#E3495A'}} disableElevation variant='contained' color='primary' href='/Dashboard' >CU PART-TIME</Button>
                    <ProfileBar />
                </Toolbar>

            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem><ListItemText><Button href='/Dashboard'>Home</Button></ListItemText></ListItem>
                    <ListItem><ListItemText><Button href='/Profile'>Profile</Button></ListItemText></ListItem>                    
                    <ListItem><ListItemText><Button href='/Schedule'>My Schedule</Button></ListItemText></ListItem>
                    <ListItem><ListItemText><Button href='/Createjob'>CreateJob</Button></ListItemText></ListItem>
                    <ListItem><ListItemText><Button href='/JobOwned'>JobOwned</Button></ListItemText></ListItem>
                    {/* <ListItem><ListItemText><Button href='/Jobowned'>JobOwned</Button></ListItemText></ListItem>
                    <ListItem><ListItemText><Button href='/Listingjob'>ListingJob</Button></ListItemText></ListItem>
                    <ListItem><ListItemText><Button href='/AboutUs'>AboutUs</Button></ListItemText></ListItem> */}
                </List>
                <Divider />
            </Drawer>

            <Router>
                <div>
                    {/* <Route exact path="/" component={Landing}/> */}
                    <Route path="/Createjob" component={CreateJob} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/noeditprofile" component={NoEditProfile} />
                    <Route path="/Schedule" component={Schedule} />
                    <Route path="/dashboard" component={Dashboard} />
                    {/* <Route path="/listingjob" component={Listingjob}/> */}
                    {/* <Route path="/dashboard" component={Dashboard}/> */}
                    <Route path="/jobowned" component={JobOwned}/>

                </div>
            </Router>
            <Footer id='Footer' />




        </div>
    );
}
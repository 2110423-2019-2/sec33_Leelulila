import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(8),
    },
}));

export default function NestedList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <WorkIcon />
                </ListItemIcon>
                <ListItemText primary={props.JobName} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <ListItemText secondary={"Detail: " + props.JobDetail} />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <ListItemText secondary={"Location: " + props.Location} />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <ListItemText secondary={"Date: " + props.Date} />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <ListItemText secondary={"Time: " + props.BeginTime + "-" + props.EndTime} />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <ListItemText secondary={"Employer: " + props.Employer} />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}

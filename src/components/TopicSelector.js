import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        // marginBottom: theme.spacing(2),
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 150,
    },
}));

export default function ControlledOpenSelect() {
    const classes = useStyles();
    const [topic, setTopic] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        setTopic(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button className={classes.button} onClick={handleOpen}>
            </Button>
            <FormControl className={classes.formControl}>
                <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={topic}
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Academic</MenuItem>
                    <MenuItem value={20}>Technology</MenuItem>
                    <MenuItem value={30}>Career Advice</MenuItem>
                    <MenuItem value={40}>Health</MenuItem>
                    <MenuItem value={50}>Activity</MenuItem>
                    <MenuItem value={60}>Lifestyle</MenuItem>
                    <MenuItem value={70}>Business</MenuItem>
                    <MenuItem value={80}>Personal Development</MenuItem>
                    <MenuItem value={90}>Others</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

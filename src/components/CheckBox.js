import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function CheckboxesGroup(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        Male: false,
        Female: false,
        Day: false,
        Night: false,
        Food: false,
        Academic: false,
        TechMechanic: false,
        ArtMusic: false,
        Activity: false,
        Others: false,
    });

    useEffect(() => {
        props.check(state)
    }, [state])

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.checked })
    };



    const { Male, Female, Day, Night, Food,Academic,TechMechanic,ArtMusic,Activity,Others} = state;
    const error = [Male, Female, Day].filter(v => v).length !== 2;

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <h3>Tag :</h3>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        control={<Checkbox checked={Male} onChange={handleChange} name="Male" />}
                        label="Male"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={Female} onChange={handleChange} name="Female" />}
                        label="Female"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={Day} onChange={handleChange} name="Day" />}
                        label="Day"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={Night} onChange={handleChange} name="Night" />}
                        label="Night"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={Food} onChange={handleChange} name="Food" />}
                        label="Food"
                    />                    
                </FormGroup>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        control={<Checkbox checked={Academic} onChange={handleChange} name="Academic" />}
                        label="Academic"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={TechMechanic} onChange={handleChange} name="TechMechanic" />}
                        label="Tech&Mechanic"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={ArtMusic} onChange={handleChange} name="ArtMusic" />}
                        label="Art&Music"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={Activity} onChange={handleChange} name="Activity" />}
                        label="Activity"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={Others} onChange={handleChange} name="Others" />}
                        label="Others"
                    />
                </FormGroup>
                <FormHelperText>This features will help the matching easier.</FormHelperText>
            </FormControl>
        </div>
    );
}

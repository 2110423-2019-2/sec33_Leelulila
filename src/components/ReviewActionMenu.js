import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import DehazeIcon from '@material-ui/icons/Dehaze';
import ConfirmDeleteReview from './ConfirmDeleteReview'
import EditReviewModal from './EditReviewModal';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}

    />
));

const StyledMenuItem = withStyles(theme => ({

    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


export default function CustomizedMenus(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="red"
                onClick={handleClick}
            >
                <DehazeIcon />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}

            >
                <EditReviewModal JobName={props.JobName} id={props.id} Rating={props.Rating} ReviewDetail={props.ReviewDetail} />
                <ConfirmDeleteReview id={props.id} />
            </StyledMenu>
        </div>
    );
}
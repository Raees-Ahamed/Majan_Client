import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        marginLeft:'20px'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
}));

const CartItems =() => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
                <ListItemText
                    primary="Item 1"
                    secondary={
                        <React.Fragment>
                            <TextField id="standard-basic" label="Quantity" value="3"/>
                        </React.Fragment>
                    }
                    className={classes.inline}
                />
                <Link variant="button" color="textPrimary" href="javascript:void(0)">
                    <CloseIcon />
                </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
                <ListItemText
                    primary="Item 2"
                    secondary={
                        <React.Fragment>
                            <TextField id="standard-basic" label="Quantity" value="2"/>
                        </React.Fragment>
                    }
                    className={classes.inline}
                />
                <Link variant="button" color="textPrimary" href="javascript:void(0)">
                    <CloseIcon />
                </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
                <ListItemText
                    primary="Item 3"
                    secondary={
                        <React.Fragment>
                            <TextField id="standard-basic" label="Quantity" value="1"/>
                        </React.Fragment>
                    }
                    className={classes.inline}
                />
                <Link variant="button" color="textPrimary" href="javascript:void(0)">
                    <CloseIcon />
                </Link>
            </ListItem>
        </List>
    );
}

export default CartItems;

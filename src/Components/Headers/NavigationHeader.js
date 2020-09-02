import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import {useHistory} from "react-router-dom";

const NavigationHeader = () => {

    const useStyles = makeStyles((theme) => ({
        appBar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        toolbar: {
            flexWrap: 'wrap',
        },
        toolbarTitle: {
            flexGrow: 1,
        },
        link: {
            margin: theme.spacing(1, 1.5),
        },
    }));

    let history = useHistory();

    const classes = useStyles();

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }))(Badge);

    return(
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Majang.lk
                    </Typography>
                    <nav>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={4} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() =>history.push("/")}>
                            Home
                        </Link>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() =>history.push("/shop")}>
                            Shop
                        </Link>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() =>history.push("/login")}>
                            Login
                        </Link>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() =>history.push("/register")}>
                            Register
                        </Link>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() =>history.push("/checkout")}>
                            Checkout
                        </Link>
                    </nav>
                    {/*<Button href="javascript:void(0)" color="primary" variant="outlined" className={classes.link} onClick={()=>history.push("/login")}>*/}
                    {/*    Login*/}
                    {/*</Button>*/}
                    {/*<Button href="javascript:void(0)" color="primary" variant="outlined" className={classes.link} onClick={()=>history.push("/register")}>*/}
                    {/*    Register*/}
                    {/*</Button>*/}
                    {/*<Button href="javascript:void(0)" color="primary" variant="outlined" className={classes.link} onClick={()=>history.push("/checkout")}>*/}
                    {/*    Checkout*/}
                    {/*</Button>*/}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavigationHeader;
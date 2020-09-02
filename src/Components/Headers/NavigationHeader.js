import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import Cart from "../Cart/Cart";

const NavigationHeader = (props) => {

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
                        {/*<IconButton aria-label="cart">*/}
                        {/*    <StyledBadge badgeContent={4} color="secondary">*/}
                        {/*        <ShoppingCartIcon />*/}
                        {/*    </StyledBadge>*/}
                        {/*</IconButton>*/}
                        <Cart />
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
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavigationHeader;
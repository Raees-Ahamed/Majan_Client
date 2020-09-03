import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
            marginLeft: 10

        },
        link: {
            margin: theme.spacing(1, 1.5),
        },
        menuButton: {
            marginLeft: 10
        }
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


    //Menu drop down
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>

                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Majang.lk

                            <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Paints</MenuItem>
                                <MenuItem onClick={handleClose}>Spare parts</MenuItem>
                                <MenuItem onClick={handleClose}>Stickers</MenuItem>
                            </Menu>


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
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() => history.push("/shop")}>
                            Shop
                        </Link>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() => history.push("/login")}>
                            Login
                        </Link>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() => history.push("/register")}>
                            Register
                        </Link>
                        <Link variant="button" color="textPrimary" href="javascript:void(0)" className={classes.link} onClick={() => history.push("/checkout")}>
                            Checkout
                        </Link>
                    </nav>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}



//-------------------------------------------------------------------------Helping methods




export default NavigationHeader;
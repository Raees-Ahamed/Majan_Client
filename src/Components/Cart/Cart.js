import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from '@material-ui/core/Badge';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CartItems from "./CartItems";
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonRightAlign: {
        float:'right'
    },
    buttonLeftAlign: {
        float:'left'
    }
}));

const Cart = () => {
    let history = useHistory();
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    );

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }))(Badge);

    return (
        <React.Fragment>
            <IconButton aria-label="cart" onClick={handleOpen}>
                <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">Cart List <ShoppingCartIcon /></h2>
                        <CartItems />
                        <br />
                        <Button variant="contained" color="primary" className={classes.buttonRightAlign} onClick={()=>history.push("/checkout")}>
                            Checkout
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.buttonLeftAlign} onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}

export default Cart;

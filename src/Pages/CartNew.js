import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import TextField from '@material-ui/core/TextField';
import GlobalData from "../Components/Global/Global";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function createData(code, image, name, quantity) {
    return { code, image, name, quantity };
}

const columns = [
    {
        id: 'item',
        label: 'Item',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'quantity',
        label: 'Quantity',
        minWidth: 60,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'unitPrice',
        label: 'Unit Price',
        minWidth: 60,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'totalPrice',
        label: 'Total Price',
        minWidth: 60,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 60,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }
]

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 50,

    },
    container: {
        maxHeight: 440,
    },
    curveBtn: {
        borderRadius: "5em"
    }
}));

const CartNew = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['cartItems']);

    const classes = useStyles();

    const [getCartItems, setCartItems] = useState({ items: cookies.cartItems });

    const { value, setValue } = useContext(GlobalData);

    const [open, setOpen] = React.useState(false);

    const [getKey, setKey] = React.useState(-1);

    const handleClickOpen = (key) => {
        setKey(key);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const row = (x, i) => {
        return (
            <TableRow key={`tr-${i}`} selectable={false}>
                <TableCell>
                    <Avatar alt="Remy Sharp" src={x.imageUrl} />
                </TableCell>

                <TableCell>
                    {x.name}
                </TableCell>

                <TableCell>
                    <TextField id="standard-basic"  value={x.qty} onChange={qtyHandler.bind(this, i)} />
                </TableCell>

                <TableCell>
                    {x.unitPrice}
                </TableCell>

                <TableCell>
                    {x.unitPrice * x.qty}
                </TableCell>

                <TableCell>
                    <Link variant="button" color="textPrimary" href="javascript:void(0)" onClick={() => handleClickOpen(i)}>
                        <CloseIcon />
                    </Link>
                </TableCell>
            </TableRow>
        );
    };

    const qtyHandler = (key, event) => {
        let newQty = event.target.value;
        let itemCopy = { ...getCartItems.items[key] };
        itemCopy.qty = newQty;
        const itemListCopy = [...getCartItems.items];
        itemListCopy[key] = itemCopy;
        setCartItems({ items: itemListCopy });
        setCookie('cartItems', JSON.stringify(itemListCopy));
    }

    const removeItemHandler = () => {
        setOpen(false);
        let itemsCopy = [...getCartItems.items];
        itemsCopy.splice(getKey, 1);
        setCartItems({ items: itemsCopy });
        setCookie('cartItems', JSON.stringify(itemsCopy));
        if (itemsCopy.length == 0) {
            removeCookie('cartItems');
        }
        setValue({
            totalItems: itemsCopy.length
        })
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((x, i) => (
                                <TableCell key={`thc-${i}`}>
                                    <div
                                        style={{
                                            display: "flex",
                                            align: x.align,
                                            minWidth: x.minWidth,
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {x.label}

                                    </div>
                                </TableCell>

                            ))}
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            (cookies.cartItems) ? (
                                getCartItems.items.map((x, i) =>
                                    row(x, i)
                                )
                            ) : <div align='center'>Cart is empty</div>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Please confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really need to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => removeItemHandler()} color="primary" autoFocus>
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

const BtnSeeMoreStyle = styled(Button)({
    backgroundColor: '#A749FF',
    border: 0,
    borderRadius: "5em",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 35,
    padding: '0 30px',
    maxWidth: '50%',

});

export default CartNew;
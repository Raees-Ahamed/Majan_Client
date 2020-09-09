import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useCookies } from 'react-cookie';
import NumberFormat from 'react-number-format';

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    { name: 'Shipping', desc: '', price: 'Free' },
];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

const Summary = () => {

    const classes = useStyles();

    const [cookies, setCookie] = useCookies(['cartItems']);

    const getTotalPrice = () =>{
        let total = 0;
        {cookies.cartItems.map((product) => (
            total = total + (product.unitPrice*product.qty)
        ))}
        console.log(total);
        return total;
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cookies.cartItems.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} style={{'width':'50px'}}/>
                        <Typography variant="body2">Rs {product.unitPrice} X {product.qty}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total Price" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {<NumberFormat value={getTotalPrice ()} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />}
                    </Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
}

export default Summary;

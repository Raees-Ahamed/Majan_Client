// import React, {Component} from 'react';
// import OrderItem from '../OrderItems/OrderItems';
// import PropTypes from 'prop-types';
//
// class Order extends Component {
//
//     render() {
//         const {orderItems} = this.props;
//         return(
//             <div>
//                 <label>OrderId: #{orderItems._id}</label>
//                 <OrderItem item={orderItems}/>
//             </div>
//         );
//     }
// }
//
// Order.propTypes = {
//     orderItems: PropTypes.object.isRequired
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderItem from '../OrderItems/OrderItems';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Order = (props) => {
    const classes = useStyles();

    const {orderItems} = props;

    console.log(orderItems.items[0]);

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}><strong>Order ID:</strong> {orderItems._id}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>
                                <strong>Creared Date:</strong> {orderItems.items[0].createdAt}
                            </li>
                                <strong>Unit Price:</strong> {orderItems.items[0].unitPrice}
                            <li>
                                <strong>Quantity:</strong> {orderItems.items[0].quantity}
                            </li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Order;
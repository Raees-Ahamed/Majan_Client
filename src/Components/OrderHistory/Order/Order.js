import React, {Component} from 'react';
import OrderItem from '../OrderItems/OrderItems';
import PropTypes from 'prop-types';

class Order extends Component {

    render() {
        const {orderItems} = this.props;
        return(
            <div>
                <label>OrderId: #{orderItems._id}</label>
                <OrderItem item={orderItems}/>
            </div>
        );
    }
}

Order.propTypes = {
    orderItems: PropTypes.object.isRequired
}

export default Order;
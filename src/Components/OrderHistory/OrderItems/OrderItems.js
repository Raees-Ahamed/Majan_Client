import React, { Component} from 'react';
import PropTypes from 'prop-types';
import OrderItemComponent from './OrderItemComponent/OrderItemComponent';

class OrderItems extends Component {

    loadOrderItems() {
        const {items} = this.props.item;
        let itemsList;

        if (items === undefined) {
            console.log('loading items');
        } else {
            if (items.length > 0) {
                itemsList = items.map((orderItem, index) => {
                    return <OrderItemComponent item={orderItem} key={index}/>;
                })
            } else {
                itemsList = <h1>No Items Found!</h1>;
            }
        }

        return itemsList;
    }

    render() {
       return(
           <div>
               {this.loadOrderItems()}
           </div>
       );
    }
}

OrderItems.propTypes = {
    item: PropTypes.object.isRequired
}

export default OrderItems;
import React, { Component } from "react";
import PropTypes from "prop-types";

class OrderItemsComponent extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <hr></hr>
        <label>CategoryId: {item.categoryId}</label>
        <br></br>
        <label>Created At: {item.createdAt}</label>
        <br></br>
        <label>IsDelivered: {item.isDelivered}</label>
        <br></br>
        <label>ProductId: {item.productId}</label>
        <br></br>
        <label>Quantity: {item.quantity}</label>
        <br></br>
        <label>Unit Price: {item.unitPrice}</label>
        <br></br>
        <label>Tax Percent: {item.taxPercent}</label>
        <br></br>
        <label>Discount Percent: {item.discountPercent}</label>
        <br></br>
      </div>
    );
  }
}

OrderItemsComponent.propTypes = {
  item: PropTypes.object.isRequired,
};

export default OrderItemsComponent;

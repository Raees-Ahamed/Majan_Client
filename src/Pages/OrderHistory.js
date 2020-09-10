import React, { Component } from "react";
import { Cookies, withCookies } from 'react-cookie';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import * as AppGlobal from "../AppHelp/AppGlobal";
import NumberFormat from "react-number-format";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import {instanceOf} from 'prop-types';
import Order from '../Components/OrderHistory/Order/Order';

class OrderHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: []
    }
  }

  componentDidMount() {
    this.loadOrderHistory();  
  }

  loadOrderHistory() {
    const {cookies} = this.props;
    console.log(cookies.get('jwtToken'));
    axios.get(AppGlobal.apiBaseUrl + "Order/History", {
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": cookies.get('jwtToken'),
        },
      })
      .then((res) => {
        this.setState({
          data: res.data.orders
        })
      }).catch((e) => {
        console.log(e);
      });
  }

  renderOrderHistory() {
    const { data } = this.state;
    let orderItems;

    if (data === undefined) {
      console.log('Loading');
    } else {
      if(data.length > 0) {
        orderItems = data.map((item, index) => {
          return <Order orderItems={item} key={index}/>
        });
      } else {
        orderItems = <h1>No Orders, to show order history</h1>;
      }
    }

    return orderItems;
  }

  render() {
    return(
      <Grid>
        {this.renderOrderHistory()}
      </Grid>
    );
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
}

export default withCookies(OrderHistory);

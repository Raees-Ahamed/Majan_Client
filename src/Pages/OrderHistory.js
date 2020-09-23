import React, { Component } from "react";
import { Cookies, withCookies } from 'react-cookie';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import * as AppGlobal from "../AppHelp/AppGlobal";
import {instanceOf} from 'prop-types';
import Order from '../Components/OrderHistory/Order/Order';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
        <br/><br/><br/>
        {this.renderOrderHistory()}
      </Grid>
    );
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
}

export default withCookies(OrderHistory);

import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Checkout from "./Pages/CheckOut";
import Cookie from "./Pages/Cookies";
import SingleItem from "./Pages/SingleItem";
import NavigationHeader from "./Components/Headers/NavigationHeader";
import Footer from "./Components/Footer/Footer";
import GlobalData from './Components/Global/Global';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class App extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        currentItems: this.props.cookies.get("cartItems") || ""
    };

  render(){

      let totalItemsInCart = this.state.currentItems.length;

      let items = this.state.currentItems.length;
      console.log(items);

    return (
        <Router>
            <GlobalData.Provider value={totalItemsInCart}>
                <NavigationHeader />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/shop" component={Shop} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/cookies" component={Cookie} />
                  <Route path="/item" component={SingleItem} />
                </Switch>
                <Footer />
            </GlobalData.Provider>
        </Router>
    );
  }
}

export default withCookies(App);

import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Checkout from "./Pages/CheckOut";
import Cookie from "./Pages/Cookies";
import SingleItem from "./Pages/SingleItem";

class App extends Component {
  render(){
    return (
        <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/shop" component={Shop} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/cookies" component={Cookie} />
              <Route path="/item" component={SingleItem} />
            </Switch>
        </Router>
    );
  }
}

export default App;

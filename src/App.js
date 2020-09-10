import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Checkout from "./Pages/CheckOut";
import Cookie from "./Pages/Cookies";
import SingleItem from "./Pages/SingleItem";
import NavigationHeader from "./Components/Headers/NavigationHeader";
import Footer from "./Components/Footer/Footer";
import GlobalData from "./Components/Global/Global";
import { useCookies } from "react-cookie";
import CartNew from "./Pages/CartNew";
import Contact from "./Pages/Contact";
import Cart from "./Components/Cart/Cart";
import OrderHistory from "./Pages/OrderHistory";
import { CookiesProvider } from "react-cookie";

const App = (props) => {
  const [cookies, setCookie] = useCookies(["cartItems"]);

  const [value, setValue] = useState({
    totalItems:
      typeof cookies.cartItems !== "undefined" ? cookies.cartItems.length : 0,
  });

  let location = useLocation();

  return (
    <GlobalData.Provider value={{ value, setValue }}>
      <CookiesProvider>
        <NavigationHeader />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/cookies" component={Cookie} />
          <Route path="/item" component={SingleItem} />
          <Route path="/cartNew" component={CartNew} />
          <Route path="/contact" component={Contact} />
          <Route path="/orderhistory" component={OrderHistory} />
        </Switch>
        {location.pathname === "/login" ? null : <Footer />}
      </CookiesProvider>
    </GlobalData.Provider>
  );
};

export default App;

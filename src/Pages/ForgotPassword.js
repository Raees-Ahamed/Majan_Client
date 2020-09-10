import React, { Component } from "react";
import Axios from "axios";
import * as AppGlobal from "../AppHelp/AppGlobal";
import { Cookies } from "react-cookie";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      email: ''
    };
    this.forgotPassword = this.forgotPassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  forgotPassword() {
    const { password, email } = this.state;

    const passwordObj = {
        email: email,
      password: password,
    };

    Axios.put(`${AppGlobal.apiBaseUrl}/forgotpassword`, passwordObj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.forgotPassword}>
          <input
            type="email"
            name="email"
            onChange={this.onChange}
            placeholder="Enter Password"
          />
          <input
            type="password"
            onChange={this.onChange}
            name="password"
            placeholder="Enter New Password"
          />
          <input
            type="password"
            onChange={this.onChange}
            name="confirmpassword"
            placeholder="Enter Confirm New Password"
          />
          <input type="submit" value="Reset" />
        </form>
      </div>
    );
  }
}

export default ForgotPassword;

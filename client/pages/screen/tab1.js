import React, { Component } from 'react';
import { Card, Button, Icon, Divider, Grid, Image, Search, Segment, Form, Input, } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { Link, Router } from '../../routes';
import { toast } from 'react-toastify';
var axios = require('axios');

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class Tab1 extends Component {
  state = {
    userName: "",
    mobile: "",
    email: "",
    address: ""
  };

  onSubmit = event => {
    event.preventDefault();
    var data = JSON.stringify({
      "userName": this.state.userName,
      "mobile": this.state.mobile,
      "email": this.state.email,
      "address": this.state.address
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/users/addUser',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      toast.success(response.data.msg,{autoClose:3000})
      Router.replaceRoute(`/screen2`);
    })
    .catch(function (error) {
      const errors=error.response.data.errors
            if(errors)
            {
             errors.forEach(error=>toast.error(error.msg,{autoClose:3000}))
            }
    });
  };

  render() {
    return (
      <Layout>

      <div>
      <Header />
      <br />
      <br />
      <h1 style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>ADD USER</h1>
                <br />
                <br />
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>User Name</label>
          <Input
            value={this.state.userName}
            onChange={event => this.setState({ userName: event.target.value })}
            label="username"
            labelPosition="right"
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Mobile</label>
          <Input
            value={this.state.mobile}
            onChange={event => this.setState({ mobile: event.target.value })}
            label="number"
            labelPosition="right"
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Input
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
            label="email"
            labelPosition="right"
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <Input
            value={this.state.address}
            onChange={event => this.setState({ address: event.target.value })}
            label="address"
            labelPosition="right"
            required
          />
        </Form.Field>
        <Button primary>
          SUBMIT
        </Button>
      </Form>

        </div>
      </Layout>
    );
  }
}

export default Tab1;

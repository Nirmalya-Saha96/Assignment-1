import React, { Component } from 'react';
import { Card, Button, Icon, Divider, Grid, Image, Header, Search, Segment, Form, Input, } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link, Router } from '../routes';
import { toast } from 'react-toastify';
var axios = require('axios');

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class Index extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = event => {
    event.preventDefault();
    var data = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      localStorage.setItem('token', (response.data.token));
      console.log(localStorage.getItem('token'));
      Router.replaceRoute(`/screen1`);
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
        <br />
        <br />
        <h1 style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>LOGIN</h1>
                  <br />
                  <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>EMAIL</label>
            <Input
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
              label="email"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>PASSWORD</label>
            <Input
              value={this.state.password}
              onChange={event => this.setState({ password: event.target.value })}
              label="password"
              labelPosition="right"
            />
          </Form.Field>
          <Button primary>
            LOGIN
          </Button>
        </Form>
        </div>
      </Layout>
    );
  }
}

export default Index;

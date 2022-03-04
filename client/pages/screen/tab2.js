import React, { Component } from 'react';
import { Card, Button, Table, Grid, Step, Divider, Icon, Form, Input, Breadcrumb } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Headerr from '../../components/Header';
import ChildRow from '../../components/ChildRow';
import { Link, Router } from '../../routes';
import { toast } from 'react-toastify';
var axios = require('axios');

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class Tab2 extends Component {
  state = {
            items: []
        };
        componentDidMount() {
          var myHeaders = new Headers();
          myHeaders.append("x-auth-token", localStorage.getItem('token'));

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
              fetch(
      "http://localhost:5000/api/users/users", requestOptions)
                  .then((res) => res.json())
                  .then((json) => {
                      this.setState({
                          items: json,
                      });
                  })
          }

  renderChildRows(){

    return this.state.items.map((check, index) => {

        return (
          <ChildRow
            key={index}
            id={check._id}
            check={check}
          />
        );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
        <Headerr />
        <br />
        <br />
          <h1 style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>USER LIST</h1>
                    <br />
                    <br />
                      <Table>
                        <Header>
                          <Row>
                            <HeaderCell>User Name</HeaderCell>
                            <HeaderCell>Mobile</HeaderCell>
                            <HeaderCell>Email</HeaderCell>
                            <HeaderCell>Address</HeaderCell>
                            <HeaderCell>Delete</HeaderCell>
                          </Row>
                        </Header>
                          <Body>{this.renderChildRows()}</Body>
                      </Table>
        </div>
      </Layout>
    );
  }
}

export default Tab2;

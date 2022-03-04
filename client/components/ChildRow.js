import React, { Component } from 'react';
import { Table, Button, Message, Icon } from 'semantic-ui-react';
import { Router } from '../routes';
import { toast } from 'react-toastify';
var axios = require('axios');

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class ChildRow extends Component {

  onDelete =  () => {
    var config = {
      method: 'delete',
      url: `http://localhost:5000/api/users/${this.props.id}`,
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    };

    axios(config)
    .then(function (response) {
      toast.success("Deleted Successfully",{autoClose:3000})
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
    const { Row, Cell } = Table;
    const { id, check } = this.props;

    return (
      <Row>
        <Cell>{check.userName}</Cell>
        <Cell>{check.mobile}</Cell>
        <Cell>{check.email}</Cell>
        <Cell>{check.address}</Cell>
        <Cell>
            <Button color="red" onClick={this.onDelete}>
              Delete
            </Button>
        </Cell>
      </Row>
    );
  }
}

export default ChildRow;

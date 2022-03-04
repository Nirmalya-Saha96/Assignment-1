import React from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from '../routes';

export default () => {

    return (
      <Menu stackable style={{ marginTop: '10px' }}>
        <Menu.Item>
        <Link route="/screen1">
          <a className="item">TAB 1</a>
        </Link>
        </Menu.Item>

        <Menu.Item>
        <Link route="/screen2">
          <a className="item">TAB 2</a>
        </Link>
        </Menu.Item>
      </Menu>
    );
};

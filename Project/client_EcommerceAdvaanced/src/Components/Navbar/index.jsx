import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/invoices">
       Product Invoices
      </a>
      {/* <a className="menu-item" href="/members">
        GYM Members
      </a> */}
      {/* <a className="menu-item" href="/invoices">
        Invoices
      </a> */}
    </Menu>
  );
};
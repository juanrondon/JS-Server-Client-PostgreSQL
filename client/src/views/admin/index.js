import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { routes } from '../routes/admin_routes';

class Admin extends Component {
  render() {
    return (
      <div className="uk-container uk-padding">
        {
          routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))
        }
      </div>
    );
  }
}

export default Admin;
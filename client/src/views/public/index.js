import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { routes } from '../routes/public_routes';
import Navbar from '../layout/navbar';

class Public extends Component {
  render() {
    return (
      <div>
        <Navbar />
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
      </div>
    );
  }
}

export default Public;
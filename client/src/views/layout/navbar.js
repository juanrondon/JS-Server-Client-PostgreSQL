import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <nav className="uk-navbar-container uk-margin" data-uk-navbar>
        <div className="uk-navbar-center">

          <div className="uk-navbar-center-left"><div>
            <ul className="uk-navbar-nav">
              <li className="uk-active"><a href="#">Active</a></li>
              <li>
                <a href="#">Parent</a>
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a></li>
                    <li><a href="#">Item</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div></div>
          <a className="uk-navbar-item uk-logo" href="#">Logo</a>
          <div className="uk-navbar-center-right"><div>
            {
              authenticated ?
                <ul className="uk-navbar-nav">
                  <li><Link to="/logout">Log out</Link></li>
                </ul>
                :
                <ul className="uk-navbar-nav">
                  <li><Link to="/login">Log in</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </ul>
            }

          </div></div>

        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  };
};

export default connect(mapStateToProps)(Navbar);
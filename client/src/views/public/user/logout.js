import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user';

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        Logged out
      </div>
    );
  }
}

export default connect(null, { logoutUser })(Logout);
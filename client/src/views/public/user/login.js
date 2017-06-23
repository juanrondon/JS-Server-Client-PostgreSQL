import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../../actions/user';

class Login extends Component {
  onSubmit(values) {
    this.props.loginUser(values);
  }

  renderError() {
    const { errorMessage } = this.props;

    if (errorMessage) {
      return (
        <div className="uk-alert-danger" data-uk-alert>
          <p>{errorMessage}</p>
        </div>
      );
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div className="uk-margin">
        <div className="uk-inline">
          <span className="uk-form-icon" data-uk-icon={`icon: ${field.icon}`}></span>
          <input
            name={field.name}
            type={field.type}
            className={`uk-input uk-width-1-1 ${touched && error && 'uk-form-danger'}`}
            {...field.input}
          />
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="uk-form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="username"
          type="text"
          icon="user"
          component={this.renderField}
        />
        <Field
          name="password"
          type="password"
          icon="lock"
          component={this.renderField}
        />
        {this.renderError()}
        <button className="uk-button uk-button-primary">
          Log in
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  /* TODO: validation */

  return errors;
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.user.error
  };
};

export default reduxForm({
  validate,
  form: 'loginForm'
})(connect(mapStateToProps, { loginUser })(Login));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../../actions/user';

class Register extends Component {
  onSubmit(values) {
    this.props.registerUser(values);
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
            placeholder={field.placeholder}
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
          placeholder="Username"
          component={this.renderField}
        />
        <Field
          name="password"
          type="password"
          icon="lock"
          placeholder="Password"
          component={this.renderField}
        />
        <Field
          name="passwordConfirm"
          type="password"
          icon="lock"
          placeholder="Confirm Password"
          component={this.renderField}
        />
        <Field
          name="email"
          type="email"
          icon="mail"
          placeholder="Email"
          component={this.renderField}
        />
        {this.renderError()}
        <button className="uk-button uk-button-primary">
          Register
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
  form: 'registerForm'
})(connect(mapStateToProps, { registerUser })(Register));
import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import './style.css'

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.fields)
    api.auth.signUp(this.state.fields)
    .then(res => {
      this.props.onLogin(res)
      this.props.history.push('/')
    })
  };

  render() {
   
    const { fields } = this.state;
    return (
      <div className="form">
        <h1>Expand your  board game group.</h1>
        <h2>Sign up for Meeple Meets and make new friends!</h2>
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label><br/>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label><br/>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="submit">
              SignUp
            </button>
          </form>
          <p>Have an account? <Link className="link" to="/login">Login Here!</Link></p>
        </div>
        {this.state.error ? <h1>Try again...</h1> : null}
      </div>
    );
  }
}

export default SignUp;
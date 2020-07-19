import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import './style.css'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: true,
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
    api.auth.login(this.state.fields)
    .then(res => {
      this.props.onLogin(res)
      this.props.history.push('/profile')
    })
  };

  render() {
   
    const { fields } = this.state;
    return (
      <div className="form">
        <h1>Meeple Meets</h1>
        <h2>Log In and make new friends!</h2>
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
            <button type="submit" className="ui basic green button">
              Login
            </button>
          </form>
        </div>
        <p>Don't have an account? <Link className="link" to="/signup">Sign Up here!</Link></p>
        {this.state.error ? <h1>Try again...</h1> : null}
      </div>
    );
  }
}

export default Login;
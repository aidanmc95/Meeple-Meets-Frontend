import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import './style.css'

class Login extends React.Component {
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
    api.auth.login(this.state.fields)
    .then(json => {
      if(json.error){
        this.setState({
          error: json.error
        })
      } else {
        this.props.onLogin(json)
        this.props.history.push('/profile')
      }
    })
  };

  render() {
   
    const { fields } = this.state;
    return (
      <div className="form">
        <h1>Meeple Meets</h1>
        <h2>Log In and make new friends!</h2>
          <form onSubmit={this.handleSubmit}onChange={this.handleChange} >
              <label>Username</label><br/>
              <input name="username" placeholder="username" value={fields.username}/>
              <label>Password</label><br/>
              <input name="password" type="password" placeholder="password" value={fields.password} />
            <button type="submit" className="loginbutton">
              Login
            </button>
          </form>
        <p>Don't have an account? <Link className="link" to="/signup">Sign Up here!</Link></p>
        {this.state.error ? <h1>{this.state.error}</h1> : null}
      </div>
    );
  }
}

export default Login;
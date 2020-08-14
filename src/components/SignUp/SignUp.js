import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import Place from '../Place/Place'
import './style.css'

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: false,
      id: null,
      fields: {
        username: '',
        password: '',
        BGGusername: '',
        email: '',
        address1: '',
        address2: '',
        zip: '',
        about_me: '',
        as_host: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    api.auth.signUp(this.state.fields)
    .then(res => {
      console.log(res)
      if(res.error) {
        this.setState({
          errors: res.error
        })
      } else {
        this.props.onLogin(res)
        this.props.history.push('/')
      }
    })
  };

  handlePlace = (location, latlng, zip) => {
    this.setState(prevState => ({
        fields: {
            ...prevState.fields,
            address1: location,
            zip: parseInt(zip)
        }
    }))
}

  showErrors = () => {
    return this.state.errors.map(error => <h1>{error}</h1>)
  }

  render() {
   
    const { fields } = this.state;
    return (
      <div className="form">
        <h1>Expand your  board game group.</h1>
        <h2>Sign up for Meeple Meets and make new friends!</h2>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <label>Username</label><br/>
            <input name="username" placeholder="username" value={fields.username} />
            <label>Password</label><br/>
            <input name="password" type="password" placeholder="password" value={fields.password}/>
            <label for="email">Email</label>
            <input required type="email" name="email" placeholder="Email" />
            <label for="BGGusername">BGG Username</label>
            <input type="text" name="BGGusername" placeholder="BGG Username" />
            <label>Address 1</label>
            <div className="placesform">
                <Place handlePlace={this.handlePlace}/>
            </div>
            <label for="address2">Address 2</label>
            <input type="text" name="address2" placeholder="Address 2" />
            <label for="zip">Zip</label>
            <input required type="number" name="zip" placeholder="Zip" value={this.state.fields.zip}/>
            <label for="about_me">About You</label><br/>
            <textarea required type="text" name="about_me" placeholder="About You" /><br/>
            <label for="as_host">As Host</label><br/>
            <textarea required type="text" name="as_host" placeholder="As Host" /><br/>
            <button type="submit" className="primarybutton">
              SignUp
            </button>
          </form>
          <p>Have an account? <Link className="link" to="/login">Login Here!</Link></p>
        {this.state.errors ? <h1>{this.showErrors()}</h1> : null}
      </div>
    );
  }
}

export default SignUp;
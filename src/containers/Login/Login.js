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

  componentDidMount() {
    document.getElementsByClassName("info")[0].focus()
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
      <div className="formPage">
        <div className="formStuff">
          <div className="formSide">
            <img src={process.env.PUBLIC_URL + '/For_Dark_Bg.png'} alt="Logo" />
            <h3 className="sideTextLarge">Hello, Meeter!</h3>
            <h4 className="sideTextSmall">Enter Your Personal Information</h4>
            <h4 className="sideTextSmall">and Start playing today</h4>
            <Link className="startLink" to="/signup">Sign Up here!</Link>
          </div>
          <div className="formInfo">
            <h1>Meeple Meets</h1>
            <h2>Log In and make new friends!</h2>
              <form onSubmit={this.handleSubmit}onChange={this.handleChange} >
                  <input className="info" name="username" placeholder="&#x1F464; username" value={fields.username}/><br/>
                  <input className="info" name="password" type="password" placeholder="&#x1f512;password" value={fields.password} /><br/>
                <button type="submit" className="primarybutton">
                  Login
                </button>
              </form>
            {this.state.error ? <h1>{this.state.error}</h1> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
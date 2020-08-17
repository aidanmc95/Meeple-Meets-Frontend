import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import Place from '../../components/Place/Place'
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

  componentDidMount() {
    document.getElementsByClassName("info")[0].focus()
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
      <div className="formPage">
        <div className="formStuff">
          <div className="formInfo">
            <img src={process.env.PUBLIC_URL + '/ForLightBg.png'} alt="Logo" />
            <h3>Expand your  board game group.</h3>
            <h3>Sign up for Meeple Meets and make new friends!</h3>
              <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <input className="info" name="username" placeholder="&#x1F464; username" value={fields.username} /><br/>
                <input className="info" name="password" type="password" placeholder="&#x1f512; password" value={fields.password}/><br/>
                <input required className="info" type="email" name="email" placeholder="&#9993; Email" /><br/>
                <input className="info" type="text" name="BGGusername" placeholder="BGG Username" /><br/>
                {/* <div className="placesform">
                    <Place className="info" handlePlace={this.handlePlace}/>
                </div><br/>
                <input className="info" type="text" name="address2" placeholder="Address 2" /><br/>
                <input required className="info" type="number" name="zip" placeholder="Zip" value={this.state.fields.zip}/>
                <label for="about_me">About You</label><br/>
                <textarea required className="info" type="text" name="about_me" placeholder="About You" /><br/>
                <label for="as_host">As Host</label><br/>
                <textarea required className="info" type="text" name="as_host" placeholder="As Host" /><br/> */}
                <button type="submit" className="primarybutton">
                  SignUp
                </button>
              </form>
              {this.state.errors ? <h1>{this.showErrors()}</h1> : null}
          </div>
          <div className="formSide">
            <h3 className="sideTextLarge">Hello, Meeter!</h3>
            <h4 className="sideTextSmall">Enter Your Personal Information</h4>
            <h4 className="sideTextSmall">and Start playing today</h4>
            <Link className="startLink" to="/login">Login Here!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
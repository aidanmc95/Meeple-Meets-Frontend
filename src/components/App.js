import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import Meets from "./Meets/Meets"
import MeetsForm from "./MeetsForm/MeetsForm"
import Boardgames from "./Boardgames/Boardgames"
import NavBar from "./NavBar/NavBar"
import { api } from "../services/api";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {
        user: {}
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(token){
      api.auth.getCurrentUser()
      .then(user => {
        this.setState({auth:{...this.state.auth, user:{id:user.id, username:user.username} }})
      })
    }

  }

  login = data => { 
    console.log(data)
    localStorage.setItem("token", data.jwt)
    this.setState({auth:{...this.state.auth, user:{id:data.id, username:data.username} }})
  };

  logout = () => {
    localStorage.removeItem("token")
    this.setState({auth:{user:{}}})
  };

  render() {
    return (
      <div>
        <div className="ui container grid">
          <div id="content" className="sixteen wide column">
            <Router>
              <NavBar onLogout={this.logout} />
              <Switch>
                <Route exact path="/profile" render={props => <Profile {...props} />} />
                <Route exact path="/meets" render={props => <Meets {...props} />} />
                <Route exact path="/meets/create" render={props => <MeetsForm {...props} />} />
                <Route exact path="/boardgames" render={props => <Boardgames {...props} />} />
                <Route exact path="/login" render={props => <Login {...props} onLogin={this.login} />}/>
                <Route exact path="/signup" render={props => <SignUp {...props} onLogin={this.login} />}/>
                <Redirect to="/login"/>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

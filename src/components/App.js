import React from "react";
import Login from "./Login";
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
              <Route exact path="/login" render={props => <Login {...props} onLogin={this.login} />}/>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

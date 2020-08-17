import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import Meets from "./Meets/Meets"
import Meet from "./Meet/Meet"
import MeetsForm from "../components/MeetsForm/MeetsForm"
import Boardgames from "./Boardgames/Boardgames"
import Boardgame from "./Boardgame/Boardgame"
import NavBar from "../components/NavBar/NavBar"
import { api } from "../services/api";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
      signup: false,
      auth: {
        user: null
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(token){
      api.auth.getCurrentUser()
      .then(user => {
        if(user.error){
          this.logout()
        } else {
          this.setState({auth:{...this.state.auth, user: user}})
        }
      })
    }
  }

  login = data => { 
    localStorage.setItem("token", data.jwt)
    this.setState({auth:{...this.state.auth, user:data.user }})
  };

  logout = () => {
    localStorage.removeItem("token")
    this.setState({auth:{user:null}})
  };

  addBoardgame = (boardgame) => {
    let newBoardgames = this.state.auth.user.boardgames
    newBoardgames.push(boardgame)
    this.setState(prevState => ({
      auth: {
        user: {
          ...prevState.auth.user,
          boardgames: newBoardgames
        }
      }
    }))
  }

  render() {
    return (
      <div className="start">
        <Router>
          <NavBar {...this.props} user={this.state.auth.user} onLogout={this.logout} />
            <Switch>
              {this.state.auth.user ? <Route exact path="/" render={props => <Profile {...props} user={this.state.auth.user}/>} /> : null}
              <Route exact path="/profile/:profileid" render={props => <Profile {...props} user={this.state.auth.user}/>} />
              <Route exact path="/meets" render={props => <Meets {...props} user={this.state.auth.user}/>} />
              {this.state.auth.user ? <Route exact path="/meets/create" render={props => <MeetsForm {...props} user={this.state.auth.user}/>} /> : null}
              <Route exact path="/meets/:meetid" render={props => <Meet {...props} user={this.state.auth.user}/>} />
              <Route exact path="/boardgames" render={props => <Boardgames {...props} />} />
              <Route exact path="/boardgames/:boardgameid" render={props => <Boardgame {...props} user={this.state.auth.user} addBoardgame={this.addBoardgame}/>} />
              {this.state.auth.user ? null : <Route exact path="/" render={props => <Login {...props} onLogin={this.login} />}/>}
              {this.state.auth.user ? null : <Route exact path="/signup" render={props => <SignUp {...props} onLogin={this.login} />}/>}
              {this.state.auth.user ? <Redirect to="/"/> : <Redirect to="/"/>}
            </Switch>
        </Router>
        <footer className="footer">
          <a href="https://linkedin.com/in/aidan-muller-cohn-03a17153" className="smallLogo" target="_blank"><img src={process.env.PUBLIC_URL + '/LI-In-Bug.png'} alt="GitHub" className="smallLogo"/></a>
          <img src={process.env.PUBLIC_URL + '/ForLightBg.png'} alt="Logo" className="largeLogo"/>
          <a href="https://github.com/aidanmc95" className="smallLogo" target="_blank"><img src={process.env.PUBLIC_URL + '/GitHub-Mark-64px.png'} alt="GitHub" className="smallLogo"/></a>
        </footer>
      </div>
    );
  }
}

export default App;

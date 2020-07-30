import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import Meets from "./Meets/Meets"
import Meet from "./Meet/Meet"
import MeetsForm from "./MeetsForm/MeetsForm"
import Boardgames from "./Boardgames/Boardgames"
import Boardgame from "./Boardgame/Boardgame"
import NavBar from "./NavBar/NavBar"
import Place from "./Place/Place"
import Map from "./Map/Map"
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
        <div className="ui container grid">
          <div id="content" className="sixteen wide column">
            <Router>
              <NavBar {...this.props} user={this.state.auth.user} onLogout={this.logout} />
              <div className="centered">
                <Switch>
                  {this.state.auth.user ? <Route exact path="/profile" render={props => <Profile {...props} user={this.state.auth.user}/>} /> : null}
                  <Route exact path="/profile/:profileid" render={props => <Profile {...props} user={this.state.auth.user}/>} />
                  <Route exact path="/meets" render={props => <Meets {...props} user={this.state.auth.user}/>} />
                  {this.state.auth.user ? <Route exact path="/meets/create" render={props => <MeetsForm {...props} user={this.state.auth.user}/>} /> : null}
                  <Route exact path="/meets/:meetid" render={props => <Meet {...props} user={this.state.auth.user}/>} />
                  <Route exact path="/boardgames" render={props => <Boardgames {...props} />} />
                  <Route exact path="/boardgames/:boardgameid" render={props => <Boardgame {...props} user={this.state.auth.user} addBoardgame={this.addBoardgame}/>} />
                  {this.state.auth.user ? null : <Route exact path="/login" render={props => <Login {...props} onLogin={this.login} />}/>}
                  {this.state.auth.user ? null : <Route exact path="/signup" render={props => <SignUp {...props} onLogin={this.login} />}/>}
                  <Route exact path="/place" render={props => <Place {...props} user={this.state.auth.user}/>} />
                  <Route exact path="/map" render={props => <Map {...props} user={this.state.auth.user}/>} />
                  {this.state.auth.user ? <Redirect to="/profile"/> : <Redirect to="/login"/>}
                </Switch>
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

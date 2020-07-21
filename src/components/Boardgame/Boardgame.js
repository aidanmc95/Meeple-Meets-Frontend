import React from 'react';
import {api} from '../../services/api'
import './style.css'

class Boardgame extends React.Component {
    state = {
        boardgame: {
            BGGrank: "",
            BGGrating: "",
            categories: [],
            description: "",
            designers: [],
            id: "",
            image: "",
            maxplayers: "",
            mechanics: [],
            minplayers: "",
            playtime: "",
            publishers: [],
            ratings: [],
            title: ""
        }
    }

    componentDidMount() {
        api.nonauth.getBoardgame(this.props.match.params.boardgameid)
        .then(resp => this.setState(prevState => ({
            boardgame: {
                ...prevState.boardgame,
                ...resp
            }
        })))
    }

    render() {
        return(
            <div>
                <div className="main">
                    <img src={this.state.boardgame.image} alt={this.state.boardgame.title}/>
                    <h3>Board Game</h3>
                    <h1>{this.state.boardgame.title}</h1>
                    <h5>{`BGG Rank #${this.state.boardgame.BGGrank}`}</h5>
                    <a href="https://boardgamegeek.com/boardgame/174430">BGG Page</a>
                </div>
                <div className="about">
                    <h2>About this Game</h2>
                    <h3>Description</h3>
                    <h5>{this.state.boardgame.description}</h5>
                </div>
                <div className="sidebar">
                    
                </div>
            </div>
        )
    }
}

export default Boardgame
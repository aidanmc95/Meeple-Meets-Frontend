import React from 'react';
import {api} from '../../services/api'
import './style.css'

class Boardgame extends React.Component {
    state = {
        owned: false,
        boardgame: {
            BGGrank: "",
            BGGrating: "",
            BGGid: "",
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

    componentDidUpdate() {
        if(this.props.user){
            if(this.props.user.boardgames.filter(boardgame => boardgame.id == this.state.boardgame.id)[0]) {
                if(!this.state.owned) {
                    this.setState({
                        owned: true
                    })
                }
            } else {
                if(this.state.owned) {
                    this.setState({
                        owned: false
                    })
                }
            }
        } else {
            if(!this.state.owned) {
                this.setState({
                    owned: true
                })
            }
        }
    }

    addGame = () => {
        if(this.props.user) {
            api.auth.addBoardgame({
                boardgame_id: this.state.boardgame.id,
                user_id: this.props.user.id,
            })
            .then(resp => this.props.addBoardgame(resp.boardgame))
        }
    }

    addLineBreaks = description => {
        console.log(description)
        console.log(description.split('\n'))
    }

    render() {
        return(
            <div>
                <div className="main">
                    <img className="gameImage"src={this.state.boardgame.image} alt={this.state.boardgame.title}/>
                    <h3>Board Game</h3>
                    <h1>{this.state.boardgame.title}</h1>
                    <h5>{`BGG Rank #${this.state.boardgame.BGGrank}`}</h5>
                    <a href={`https://boardgamegeek.com/boardgame/${this.state.boardgame.BGGid}`}>BGG Page</a>
                </div>
                <div className="about">
                    <h2>About this Game</h2>
                    <h3>Description</h3>
                    <h5 className="description">{this.state.boardgame.description}</h5>
                </div>
                <div className="sidebar">
                    {this.state.owned ? null : <button className="addtolibrary" onClick={() => this.addGame()} >Add Boardgame</button>}
                </div>
            </div>
        )
    }
}

export default Boardgame
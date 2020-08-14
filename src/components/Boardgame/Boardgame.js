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
        window.scroll({
            top: 0, 
            left: 0
        });
        
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

    splitDescription = () => {
        let description  = this.state.boardgame.description
        description = description.split("splithere")
        return description.map(part => <p>{part}</p>)
    }

    render() {
        return(
            <div className="gamePage">
                <div className="main">
                    <div className="gameDiv">
                        <img className="gameImage" src={this.state.boardgame.image} alt={this.state.boardgame.title}/>
                    </div>
                    <div>
                        <h4>Board Game</h4>
                        <h1>{this.state.boardgame.title}</h1>
                        <h5>Designers: {this.state.boardgame.designers.map(designer => designer.name).join(", ")}</h5>
                        <h5>{`BGG Rank #${this.state.boardgame.BGGrank}`}</h5>
                        <h5><a href={`https://boardgamegeek.com/boardgame/${this.state.boardgame.BGGid}`} target="_blank">View on boardgamegeek.com</a></h5>
                    </div>
                </div>
                <div className="aboutmain">
                    <div>
                        <h2>About this Game</h2>
                        <h3>Description</h3>
                        {this.splitDescription()}
                    </div>
                    <div className="rightSide">
                        <div className="sidebar">
                            {this.props.user ? 
                                this.state.owned ? 
                                    <div className="addtolibrary">YOU OWN THIS GAME</div> 
                                    : <button className="addtolibrary" onClick={() => this.addGame()} >Add Boardgame</button>
                                : <div className="addtolibrary">LOG IN TO ADD GAME</div>
                            }
                            <div className="properties">
                                <h3>Categories</h3>
                                {this.state.boardgame.categories.map(category => <h6>{category.category}</h6>)}
                                <h3>Mechanics</h3>
                                {this.state.boardgame.mechanics.map(mechanic => <h6>{mechanic.mechanic}</h6>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Boardgame
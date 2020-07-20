import React from 'react';
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import {api} from '../../services/api'
import './style.css'

class Boardgames extends React.Component {
    state = {
        boardgames: []
    }

    componentDidMount() {
        api.nonauth.getBoardgames()
        .then(resp => this.setState({
            boardgames: resp
        }))
    }

    loadBoardgames = () => {
        return this.state.boardgames.map(boardgame => <BoardgameTile key={boardgame.id} id={boardgame.id} boardgame={boardgame} />)
    }

    render() {
        return(
            <div>
                <p>Hi from Boardgames</p>
                <div className="grid-container">
                    {this.loadBoardgames()}
                </div>
            </div>
        )
    }
}

export default Boardgames
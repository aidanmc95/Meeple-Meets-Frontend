import React from 'react';
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import {api} from '../../services/api'
import './style.css'

class Boardgames extends React.Component {
    state = {
        boardgames: [],
        page: 1
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

    changePage = (newPage) => {
        this.setState({
            page: newPage
        })
    }

    render() {
        return(
            <div>
                <p>Hi from Boardgames</p>
                <div className="grid-container">
                    {this.loadBoardgames()}
                </div>
                <div className="gamesPage">
                    <button onClick={() => this.changePage(this.state.page - 1)}>Previous Page</button>
                    <h5>{this.state.page}</h5>
                    <button onClick={() => this.changePage(this.state.page + 1)}>Next Page</button>
                </div>
            </div>
        )
    }
}

export default Boardgames
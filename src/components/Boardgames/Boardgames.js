import React from 'react';
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import {api} from '../../services/api'
import './style.css'

class Boardgames extends React.Component {
    state = {
        boardgames: [],
        filter: "",
        page: 1
    }

    componentDidMount() {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
        api.nonauth.getBoardgames()
        .then(resp => this.setState({
            boardgames: resp
        }))
    }

    loadBoardgames = () => {
        let page_games = this.filterGames().slice(((this.state.page-1) * 20), ((this.state.page) * 20));
        return page_games.map(boardgame => <BoardgameTile key={boardgame.id} id={boardgame.id} boardgame={boardgame} />)
    }

    handleFilter = (event) => {
        this.setState({
            filter: event.target.value,
            page: 1
        })
    }

    filterGames = () => {
        return (this.state.filter !== "" ? this.state.boardgames.filter(boardgame => boardgame.title.toUpperCase().includes(this.state.filter.toUpperCase())) : this.state.boardgames)
    }

    changePage = (newPage) => {
        this.setState({
            page: newPage
        })
    }

    render() {
        return(
            <div>
                <h1>Board Game Library</h1>
                <div className="gameSearch">
                    <input type="text" onChange={(event) => this.handleFilter(event)} placeholder="Search for a Game" />
                </div>
                <div className="grid-container">
                    {this.loadBoardgames()}
                </div>
                <div className="gamesPage">
                    <h5><span>{this.state.boardgames[(this.state.page-2) * 20] ? <button className="secondarybutton" style={{margin: "8px"}} onClick={() => this.changePage(this.state.page - 1)}>Previous Page</button> : null}</span>{this.state.page}<span>{this.state.boardgames[(this.state.page) * 20] ? <button className="secondarybutton" style={{margin: "8px"}}onClick={() => this.changePage(this.state.page + 1)}>Next Page</button> : null}</span></h5>
                </div>
            </div>
        )
    }
}

export default Boardgames
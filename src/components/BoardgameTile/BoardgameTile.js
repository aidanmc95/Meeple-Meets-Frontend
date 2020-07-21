import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class BoardgameTile extends React.Component {
    handleGameClick = (event, id) => {
        console.log(event)
        this.props.history.push(`/boardgames${id}`)
    }
    
    render() {

        const { id, boardgame } = this.props

        return(
            <div>
                <Link to={`/boardgames/${id}`} className="grid-element">
                <img src={boardgame.thumbnail} alt={`${boardgame.title}`}/>
                <h4>{boardgame.title}</h4>
                </Link>
                <h5>BGG Rank #{boardgame.BGGrank}</h5>
                <h5>BGG Rating {parseFloat(boardgame.BGGrating).toFixed(2)}</h5>
            </div>
        )
    }
}

export default BoardgameTile
import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class BoardgameTile extends React.Component {
    handleGameClick = (event, id) => {
        console.log(event)
        this.props.history.push(`/boardgames${id}`)
    }

    componentDidMount() {
        window.scroll({
            top: 0, 
            left: 0
        });
    }
    
    render() {

        const { id, boardgame } = this.props

        return(
            <div className="gameTile">
                <Link to={`/boardgames/${id}`} className="grid-element">
                    <img className='gameTileImage' src={boardgame.thumbnail} alt={`${boardgame.title}`}/>
                    <h4>{boardgame.title}</h4>
                </Link>
                <h5>BGG Rank #{boardgame.BGGrank}</h5>
                <h5>BGG Rating {parseFloat(boardgame.BGGrating).toFixed(2)}</h5>
            </div>
        )
    }
}

export default BoardgameTile
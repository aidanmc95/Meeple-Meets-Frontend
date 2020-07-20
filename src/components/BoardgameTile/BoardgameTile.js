import React from 'react';
import './style.css'

class BoardgameTile extends React.Component {
    render() {

        const { id, boardgame } = this.props

        return(
            <div className="grid-element">
                <img src={boardgame.thumbnail} />
                <h4>{boardgame.title}</h4>
                <h5>BGG Rank #{boardgame.BGGrank}</h5>
                <h5>BGG Rating {parseFloat(boardgame.BGGrating).toFixed(2)}</h5>
            </div>
        )
    }
}

export default BoardgameTile
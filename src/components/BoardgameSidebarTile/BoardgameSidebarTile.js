import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class BoardgameSidebarTile extends React.Component {
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
            <Link to={`/boardgames/${id}`}>
                <div className="gameSideTile">
                    <div>
                        <img className='gameSideTileImage' src={boardgame.thumbnail} alt={`${boardgame.title}`}/>
                    </div>
                    <div>
                        <h5 style={{color: "#3E3E3E"}}>{boardgame.title}</h5>
                        <h6>BGG Rank #{boardgame.BGGrank}</h6>
                    </div>
                </div>
            </Link>
        )
    }
}

export default BoardgameSidebarTile
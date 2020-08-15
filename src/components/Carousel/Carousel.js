import React from 'react';
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';
import './style.css'

class Carousel extends React.Component {
    loadImages = () => {
        return this.props.boardgames.slice(0, 10).map(boardgame => <img style={{height: 125}} src={boardgame.thumbnail}/>)
    }
    
    render() {
        return(
            <Coverflow
            height={225}
            active={2}
            displayQuantityOfSide={3}
            enableHeading={false}
            >
                {this.loadImages()}
            </Coverflow>
        )
    }
}

export default Carousel
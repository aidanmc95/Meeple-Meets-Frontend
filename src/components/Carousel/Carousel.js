import React from 'react';
import Coverflow from 'react-coverflow';

class Carousel extends React.Component {
    loadImages = () => {
        console.log(this.props)
        return this.props.boardgames.slice(0, 10).map(boardgame => <img id={`coverflow_img_${boardgame.id}`} style={{height: 125}} src={boardgame.thumbnail}/>)
    }
    
    render() {
        return(
            <div className="carousel">
                {this.props.boardgames[0] ? <Coverflow
                height={225}
                active={2}
                displayQuantityOfSide={3}
                enableHeading={false}
                enableScroll={false}
                >
                    {this.loadImages()}
                </Coverflow> : null}
            </div>
        )
    }
}

export default Carousel
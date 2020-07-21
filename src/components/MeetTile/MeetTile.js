import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class MeetTile extends React.Component {
    render() {

        const { id, meet } = this.props

        return(
            <div>
                <Link to={`/meets/${id}`}>
                    <p>Hi from Meets Tile</p>
                </Link>
            </div>
        )
    }
}

export default MeetTile
import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class MeetTile extends React.Component {
    render() {

        const { id, meet } = this.props

        return(
            <Link to={`/meets/${id}`}>
                <div className="meettile">
                    <h3>{meet.name}</h3>
                    <h5>{meet.when}</h5>
                    <h5>Hosted By {meet.user.username}</h5>
                </div>
            </Link>
        )
    }
}

export default MeetTile
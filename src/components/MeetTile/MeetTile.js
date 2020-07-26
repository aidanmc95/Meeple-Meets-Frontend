import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class MeetTile extends React.Component {

    state = {
        diffAddress: false,
        address: "",
        distance: 0
    }

    componentDidMount() {
        var origin1 = '98101';
        var destinationA = this.props.meet.zip.toString();

        let service = window.google.maps.DistanceMatrixService

        service.prototype.getDistanceMatrix(
            {
              origins: [origin1],
              destinations: [destinationA],
              travelMode: 'DRIVING',
            }, callback => {
                if(callback.rows[0].elements[0].status == "OK") {
                    this.setState({
                        distance: callback.rows[0].elements[0].distance.text
                    })
                } else {
                    this.setState({
                        distance: callback.rows[0].elements[0].status
                    })
                }
            }
        );
    }

    render() {

        const { id, meet } = this.props

        return(
            <Link to={`/meets/${id}`}>
                <div className="meettile">
                    <h3>{meet.name}</h3>
                    <h5>{meet.when}</h5>
                    <h5>Hosted By {meet.user.username}</h5>
                    <h5>Distance: {this.state.distance}</h5>
                </div>
            </Link>
        )
    }
}

export default MeetTile
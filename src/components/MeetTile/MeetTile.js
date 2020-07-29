import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class MeetTile extends React.Component {

    state = {
        address: null,
        distance: "Not Logged In"
    }

    componentDidMount() {
        if(this.state.address != this.props.location) {
            var origin1 = this.props.location;
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
                            distance: callback.rows[0].elements[0].distance.text,
                            address:this.props.location
                        })
                    } else {
                        this.setState({
                            distance: callback.rows[0].elements[0].status,
                            address:this.props.location
                        })
                    }
                }
            );
        }
    }

    componentDidUpdate() {
        if(this.state.address != this.props.location) {
            var origin1 = this.props.location;
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
                            distance: callback.rows[0].elements[0].distance.text,
                            address:this.props.location
                        })
                    } else {
                        this.setState({
                            distance: callback.rows[0].elements[0].status,
                            address:this.props.location
                        })
                    }
                }
            );
        }
    }

    render() {

        const { id, meet } = this.props

        return(
            <div className="meettile">
                <Link to={`/meets/${id}`}>
                    <h3>{meet.name}</h3>
                    <h5>Date: {new Date(meet.when).toJSON().slice(0,10).replace(/-/g,'/')}</h5>
                    <h5>Time: {new Date(meet.when).toLocaleTimeString()}</h5>
                    <h5>Hosted By {meet.user.username}</h5>
                    <h5>Distance: {this.state.distance}</h5>
                </Link>
            </div>
        )
    }
}

export default MeetTile
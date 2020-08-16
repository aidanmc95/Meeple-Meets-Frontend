import React from 'react';
import {api} from '../../services/api'
import MeetTile from '../../components/MeetTile/MeetTile'
import Place from '../../components/Place/Place'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './style.css'

class Meets extends React.Component {

    state = {
        meets: [],
        diff_location: false,
        location: null,
        lat: null,
        lng: null,
        date: new Date()
    }

    componentDidMount() {
        api.auth.getMeets()
        .then(resp => {
            this.setState({
                meets: resp,
            })
        })

        if(this.props.user) {
            if(this.props.user.address1 != this.state.location && !this.state.diff_location) {
                this.setState({
                    location: this.props.user.address1
                })
            }
        }
    }

    componentDidUpdate() {
        if(this.props.user) {
            if(this.props.user.address1 != this.state.location && !this.state.diff_location) {
                this.setState({
                    location: this.props.user.address1
                })
            }
        }
    }

    loadMeets = () => {
        let filteredMeets = this.state.meets.filter(meet => new Date(meet.when).toJSON().slice(0,10).replace(/-/g,'/') == new Date(this.state.date).toJSON().slice(0,10).replace(/-/g,'/'))
        if(!filteredMeets[0]) {
            return <h3>There are no meets on {new Date(this.state.date).toJSON().slice(0,10).replace(/-/g,'/')}.</h3>
        } else {
            return filteredMeets.map(meet => <MeetTile key={meet.id} id={meet.id} meet={meet} location={this.state.location}/>)
        }
    }

    handlePlace = (location, latlng, zip) => {
        this.setState({
            diff_location: true,
            location: location,
            lat: latlng.lat,
            lng: latlng.lng
        })
    }

    changeDate = date => this.setState({ date })

    render() {
        return(
            <div className="centered">
                <div className="navlogo2">
                    <img src={process.env.PUBLIC_URL + '/ForLightBg.png'} alt="Logo" />
                </div>
                <div>
                    <h5>Meeple Meets connects board game groups, so you'll always have a full table.</h5>
                    {localStorage.getItem("token") ? <h5>Can't find what you are looking for? <Link to="/meets/create">Host A Meet</Link></h5>  : null}
                </div>
                <div className="filterbar">
                    <div className="places">
                    <Place handlePlace={this.handlePlace}/>
                    </div>
                </div>
                <div className="meetsMain">
                    <div className="meets">
                        {this.loadMeets()}
                    </div >
                    <div>
                        <Calendar
                        className="calendar"
                        onChange={this.changeDate}
                        value={this.state.date}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Meets
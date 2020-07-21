import React from 'react';
import {api} from '../../services/api'
import MeetTile from '../MeetTile/MeetTile'
import { Link } from 'react-router-dom'
import './style.css'

class Meets extends React.Component {

    state = {
        meets: []
    }

    componentDidMount() {
        api.nonauth.getMeets()
        .then(resp => {
            console.log(resp)
            this.setState({
                meets: resp
            })
        })
    }

    loadMeets = () => {
        return this.state.meets.map(meet => <MeetTile key={meet.id} id={meet.id} meet={meet} />)
    }

    render() {
        return(
            <div>
                <div className="navlogo">
                    <img src={process.env.PUBLIC_URL + '/ForLightBg.png'} alt="Logo" />
                </div><br/><br/>
                <h5>Meeple Meets connects board game groups, so you'll always have a full table.</h5>
                <div className="filterbar"></div>
                {localStorage.getItem("token") ? <h5>Can't find what you are looking for? <Link to="/meets/create">Host A Meet</Link></h5>  : null}
                {this.loadMeets()}
                <div className="Map"></div>
            </div>
        )
    }
}

export default Meets
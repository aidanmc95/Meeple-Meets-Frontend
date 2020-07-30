import React from 'react';
import moment from 'moment';
import Place from '../Place/Place'
import {api} from '../../services/api'
import './style.css'

class MeetsForm extends React.Component {

    state = {
        error: true,
        fields: {
            user_id: null,
            name: '',
            when: null,
            location: "",
            size: null,
            description: "",
            zip: 0
        }
    }

    componentDidMount() {
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                user_id: this.props.user.id
            }
        }))
    }

    handlePlace = (location, latlng, zip) => {
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                location: location,
                zip: parseInt(zip)
            }
        }))
    }

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };

    handleSubmit = (event) => {
        event.preventDefault()
        api.auth.createMeet(this.state.fields)
        .then(resp => {
            this.props.history.push(`/meets/${resp.id}`)
        })
    }

    render() {
        return(
            <div className="hostMeet">
                <div className="navlogo2">
                    <img src={process.env.PUBLIC_URL + '/ForLightBg.png'} alt="Logo" />
                </div>
                <h2>Host A Meet</h2>
                <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                    <label for="name">Meet Name</label>
                    <input required type="text" name="name" maxLength="30" minLength="4" />
                    <label for="when">When</label>
                    <input required type="datetime-local" name="when" min={moment().format('YYYY-MM-DTHH:mm')} />
                    <label>Location</label>
                    <div className="placesform">
                        <Place handlePlace={this.handlePlace}/>
                    </div>
                    <label for="zip">Zip</label>
                    <input required type="number" name="zip" value={this.state.fields.zip}/>
                    <label for="size">Maximum Gamers</label>
                    <input required type="number" name="size" min="2" max="100"/>
                    <label for="description">Description</label><br/>
                    <textarea required type="text" name="description" /><br/>
                    <button type="submit">Host Meet</button>
                </form>
            </div>
        )
    }
}

export default MeetsForm
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
            <div className="formPage">
                <div className="formStuff">
                    <div className="navlogo2">
                        <img style={{"margin-top": "10px", "margin-left": "10px"}} src={process.env.PUBLIC_URL + '/ForLightBg.png'} alt="Logo" />
                    </div>
                    <div className="hostMeet">
                        <h3>Host A Meet</h3>
                        <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                            <input required type="text" name="name" maxLength="30" minLength="4" placeholder="Meet Name"/><br/><br/>
                            <input required type="datetime-local" name="when" min={moment().format('YYYY-MM-DTHH:mm')} placeholder="When"/><br/><br/>
                            <Place handlePlace={this.handlePlace}/><br/>
                            <input required type="number" name="zip" value={this.state.fields.zip} placeholder="Zip"/><br/><br/>
                            <input required type="number" name="size" min="2" max="100" placeholder="Max Gamers"/><br/><br/>
                            <textarea required type="text" name="description" placeholder="Description"/><br/><br/>
                            <button className="primarybutton" type="submit">Host Meet</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default MeetsForm
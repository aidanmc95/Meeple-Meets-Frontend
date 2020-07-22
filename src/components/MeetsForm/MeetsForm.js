import React from 'react';
import moment from 'moment';
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
            description: ""
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
            <div>
                <p>Hi from Meets Form</p>
                <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                    <label for="name">Meet Name</label>
                    <input required type="text" name="name" maxLength="30" minLength="4" />
                    <label for="when">When</label>
                    <input required type="datetime-local" name="when" min={moment().format('YYYY-MM-DTHH:mm')} />
                    <label for="location">Location</label>
                    <input required type="text" name="location" />
                    <label for="size">Maximum Gamers</label>
                    <input required type="number" name="size" min="2" max="100"/>
                    <label for="description">Description</label>
                    <textarea required type="text" name="description" />
                    <button type="submit">Host Meet</button>
                </form>
            </div>
        )
    }
}

export default MeetsForm
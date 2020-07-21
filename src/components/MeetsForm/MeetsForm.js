import React from 'react';
import moment from 'moment';
import './style.css'

class MeetsForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.when.value)
    }

    render() {
        return(
            <div>
                <p>Hi from Meets Form</p>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label for="name">Meet Name</label>
                    <input type="text" name="name" maxLength="30" minLength="4" />
                    <label for="when">When</label>
                    <input type="datetime-local" name="when" min={moment().format('YYYY-MM-DTHH:mm')} />
                    <label for="location">Location</label>
                    <input type="text" name="location" />
                    <label for="size">Maximum Gamers</label>
                    <input type="number" name="size" max="100"/>
                    <label for="description">Description</label>
                    <textarea type="text" name="description" />
                    <button type="submit">Host Meet</button>
                </form>
            </div>
        )
    }
}

export default MeetsForm
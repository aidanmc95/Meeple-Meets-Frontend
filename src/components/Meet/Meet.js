import React from 'react';
import {api} from '../../services/api'
import './style.css'

class Meet extends React.Component {

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

    render() {
        return(
            <div>
                <p>Hi from meet Page</p>
            </div>
        )
    }
}

export default Meet
import React from 'react';
import {api} from '../../services/api'
import './style.css'

class Meet extends React.Component {

    state = {
        meet: []
    }

    componentDidMount() {
        console.log(this.props.match.params.meetid)
        api.nonauth.getMeet(this.props.match.params.meetid)
        .then(resp => {
            console.log(resp)
            this.setState({
                meet: resp
            })
        })
    }

    joinMeet = () => {

    }

    render() {
        return(
            <div>
                <p>Hi from meet Page</p>
                <button className="joinmeet" onClick={() => this.joinMeet()}>Request to Join</button>
            </div>
        )
    }
}

export default Meet
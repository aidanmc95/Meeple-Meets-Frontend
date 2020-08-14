import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import './style.css'

class InviteConfirmation extends React.Component { 
    
    answerInvite = (answer) => {
        api.auth.updateInvite(
            this.props.id,
            {
                status: answer
            }
        )
        .then(resp => this.props.updateInvite(resp))
    }
    
    render() {

        const { invite } = this.props

        return(
            <div className="invite">
                <h5><Link to={`/profile/${invite.user.id}`}>{invite.user.username}</Link> Would Like to go to the Meet</h5>
                <div className="center">
                    <button className="secondarybutton" onClick={() => this.answerInvite(true)}>Accept Invite</button>
                    <button className="secondarybutton" onClick={() => this.answerInvite(false)}>Decline Invite</button>
                </div>
            </div>
        )
    }
}

export default InviteConfirmation
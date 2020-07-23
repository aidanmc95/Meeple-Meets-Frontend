import React from 'react';
import {api} from '../../services/api'
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
                <h3>{invite.user.username} Would Like to go to the Meet</h3>
                <button className="confirminvite" onClick={() => this.answerInvite(true)}>Accept Invite</button>
                <button className="confirminvite" onClick={() => this.answerInvite(false)}>Decline Invite</button>
            </div>
        )
    }
}

export default InviteConfirmation
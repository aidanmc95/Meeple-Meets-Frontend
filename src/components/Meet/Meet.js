import React from 'react';
import {api} from '../../services/api'
import './style.css'

class Meet extends React.Component {

    state = {
        disabledButton: false,
        cancelButton: false,
        meet: {
            name: "",
            size: null,
            invites: [],
            location: "",
            description: "",
            user: {
                id: null,
                username: null
            }
        }
    }

    componentDidMount() {
        api.auth.getMeet(this.props.match.params.meetid)
        .then(resp => {
            this.setState({
                meet: resp
            })
        })
    }

    componentDidUpdate() {
        if(this.props.user){
            if(this.state.meet.invites.filter(invite => invite.user.id == this.props.user.id)[0] || this.props.user.id == this.state.meet.user.id) {
                if(!this.state.disabledButton) {
                    this.setState({
                        disabledButton: true
                    })
                }
            } else {
                if(this.state.disabledButton) {
                    this.setState({
                        disabledButton: false
                    })
                }
            }

            if(this.props.user.id == this.state.meet.user.id) {
                if(!this.state.cancelButton) {
                    this.setState({
                        cancelButton: true
                    })
                }
            } else {
                if(this.state.cancelButton) {
                    this.setState({
                        cancelButton: false
                    })
                }
            }
        } else {
            if(!this.state.disabledButton) {
                this.setState({
                    disabledButton: true
                })
            }

            if(this.state.cancelButton) {
                this.setState({
                    disabledButton: false
                })
            }
        }
    }

    updateInvites = (invite) => {
        let newInvites = this.state.meet.invites
        newInvites.push(invite)
        this.setState(prevState => ({
            meet: {
                ...prevState.meet,
                invites: newInvites
            }
        }))
    }

    joinMeet = () => {
        if(this.props.user) {
            api.auth.createInvite({
                meet_id: this.props.match.params.meetid,
                user_id: this.props.user.id,
                status: false
            })
            .then(resp => this.updateInvites(resp))
        }
    }

    cancelMeet = () => {
        api.auth.deleteMeet(this.props.match.params.meetid)
        .then(resp => this.props.history.push('/profile'))
    }

    render() {
        return(
            <div>
                <h1>{this.state.meet.name}</h1>
                <h2>Hosted By: {this.state.meet.user.username}</h2>
                <h4>Max Size: {this.state.meet.size}</h4>
                <h4>Current Gamer: {this.state.meet.invites.length}</h4>
                <h3>Address</h3>
                <h5>{this.state.meet.location}</h5>
                <h3>From the Host</h3>
                <h5>{this.state.meet.description}</h5>
                {this.state.disabledButton ? null : <button className="joinmeet" disabled={this.state.disabledButton} onClick={() => this.joinMeet()}>Request to Join</button>}
                {this.state.cancelButton ? <button className="cancelmeet" onClick={() => this.cancelMeet()}>Cancel Meet</button> : null}
            </div>
        )
    }
}

export default Meet
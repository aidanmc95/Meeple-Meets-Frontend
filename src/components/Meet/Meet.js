import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import InviteConfirmation from '../InviteConfirmation/InviteConfirmation'
import './style.css'

class Meet extends React.Component {

    state = {
        disabledButton: false,
        meetHost: false,
        meet: {
            name: "",
            size: null,
            invites: [],
            location: "",
            description: "",
            user: {
                id: null,
                username: null
            },
            brought_games: []
        }
    }

    componentDidMount() {
        api.auth.getMeet(this.props.match.params.meetid)
        .then(resp => {
            this.setState(prevState => ({
                meet: {
                    ...prevState.meet,
                    ...resp
                }
            }))
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
                if(!this.state.meetHost) {
                    this.setState({
                        meetHost: true
                    })
                }
            } else {
                if(this.state.meetHost) {
                    this.setState({
                        meetHost: false
                    })
                }
            }
        } else {
            if(!this.state.disabledButton) {
                this.setState({
                    disabledButton: true
                })
            }

            if(this.state.meetHost) {
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
                status: null
            })
            .then(resp => this.updateInvites(resp))
        }
    }

    cancelMeet = () => {
        api.auth.deleteMeet(this.props.match.params.meetid)
        .then(resp => this.props.history.push('/profile'))
    }

    loadBoardgames = () => {
        return this.state.meet.brought_games.map(brought_game => <BoardgameTile key={brought_game.boardgame.id} id={brought_game.boardgame.id} boardgame={brought_game.boardgame} />)
    }

    updateInvite = invite => {
        let newInvites = this.state.meet.invites
        for(let i = 0; i < newInvites.length; i++) {
            if(newInvites[i].id == invite.id) {
                newInvites[i] = invite
            }
        }
        this.setState(prevState => ({
            meet: {
                ...prevState.meet,
                invites: newInvites
            }
        }))
        console.log(invite)
    }

    loadConfirmations = () => {
        return this.state.meet.invites.map(invite => invite.status == null ? <InviteConfirmation key={invite.id} id={invite.id} invite={invite} user_id={this.props.user.id} updateInvite={this.updateInvite}/> : null)
    }

    render() {

        const currentGamers = this.state.meet.invites.filter(invite => invite.status).length

        return(
            <div>
                <h1>{this.state.meet.name}</h1>
                <h2>Hosted By: <Link to={`/profile/${this.state.meet.user.id}`}>{this.state.meet.user.username}</Link></h2>
                <h4>Max Size: {this.state.meet.size}</h4>
                <h4>Current Gamers: {currentGamers}</h4>
                <h3>Address</h3>
                <h5>{this.state.meet.location}</h5>
                <h3>From the Host</h3>
                <h5>{this.state.meet.description}</h5>
                {this.state.disabledButton ? null : <button className="joinmeet" disabled={this.state.disabledButton} onClick={() => this.joinMeet()}>Request to Join</button>}
                {this.state.meetHost ? <button className="cancelmeet" onClick={() => this.cancelMeet()}>Cancel Meet</button> : null}
                <div className="broughtgames">
                    {this.loadBoardgames()}
                </div>
                {(this.state.meetHost && currentGamers < this.state.meet.size) ? <div className="invites">
                    {this.loadConfirmations()}
                </div> : null }
            </div>
        )
    }
}

export default Meet
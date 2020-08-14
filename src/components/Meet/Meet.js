import React from 'react';
import {api} from '../../services/api'
import { Link } from 'react-router-dom'
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import Map from '../Map/Map'
import InviteConfirmation from '../InviteConfirmation/InviteConfirmation'
import MeetGameForm from '../MeetGameForm/MeetGameForm'
import './style.css'

class Meet extends React.Component {

    state = {
        disabledButton: false,
        meetHost: false,
        disableAddGame: false,
        meet: {
            id: null,
            name: "",
            size: null,
            invites: [],
            location: null,
            zip: null,
            description: "",
            user: {
                id: null,
                username: null
            },
            brought_games: []
        }
    }

    componentDidMount() {
        window.scroll({
            top: 0, 
            left: 0
        });
        
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

            if(this.state.meet.invites.filter(invite => (invite.user.id == this.props.user.id && invite.status))[0] || this.props.user.id == this.state.meet.user.id) {
                if(this.state.disableAddGame) {
                    this.setState({
                        disableAddGame: false
                    })
                }
            } else {
                if(!this.state.disableAddGame) {
                    this.setState({
                        disableAddGame: true
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

            if(!this.state.disableAddGame) {
                this.setState({
                    disableAddGame: true
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
        return this.state.meet.brought_games.map(brought_game => <BoardgameTile key={brought_game.boardgame.id} id={brought_game.boardgame.id} user={brought_game.user} boardgame={brought_game.boardgame} />)
    }

    addBroughtGame = (brought_game) => {
        if(!brought_game.error){
            const newBroughtGames = this.state.meet.brought_games
            newBroughtGames.push(brought_game)
            this.setState(prevState => ({
                meet: {
                    ...prevState.meet,
                    brought_games: newBroughtGames
                }
            }))
        }
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
    }

    loadConfirmations = () => {
        return this.state.meet.invites.map(invite => invite.status == null ? <InviteConfirmation key={invite.id} id={invite.id} invite={invite} user_id={this.props.user.id} updateInvite={this.updateInvite}/> : null)
    }

    render() {

        const currentGamers = this.state.meet.invites.filter(invite => invite.status).length + 1

        return(
            <div>
                <Link to='/meets'>Back to the meet list</Link>
                <div className="meetinfo">
                    <div className="leftSide">
                        <h1>{this.state.meet.name}</h1>
                        <h4>Hosted By: <Link to={`/profile/${this.state.meet.user.id}`}>{this.state.meet.user.username}</Link></h4>
                        <h4>Current Meeters: {currentGamers} of {this.state.meet.size}</h4>
                        {this.state.meet.location? 
                            <div>
                                <h3>Address</h3> 
                                <h5><a href={"https://www.google.com/maps?q=" + this.state.meet.location} target="_blank">{this.state.meet.location}</a></h5>
                            </div>
                            : <div className="noInvite">
                                <h5>Exact Address hidden until you are approved</h5>
                                <h6>This information will be available to you once the host has approved your invitation.</h6>
                            </div>
                        }
                        <Map location={this.state.meet.location} zip={this.state.meet.zip}/>
                        <h3>From the Host</h3>
                        <h5>{this.state.meet.description}</h5>
                    </div>
                    <div className="rightSide">
                        <div className="sidebar">
                            <div className="top">
                                Event Details
                            </div>
                            <div className="properties" >
                                <h5>Host Requests</h5>
                                <h5>Gaming Style</h5>
                                <h5>Other</h5>
                                {this.state.disabledButton ? null : <button className="primarybutton" disabled={this.state.disabledButton} onClick={() => this.joinMeet()}>Request to Join</button>}
                                {!this.state.disableAddGame ? 
                                    <MeetGameForm user={this.props.user} meet={this.state.meet} addBroughtGame={this.addBroughtGame}/>
                                    : null
                                }
                            </div>
                            {this.state.meetHost ? <button className="cancelMeet" onClick={() => this.cancelMeet()}>Cancel Meet</button> : null}
                        </div>
                        {this.state.disabledButton ? null : <h6>Hosts usually respond within 24 hours.</h6>}
                        {(this.state.meetHost && currentGamers < this.state.meet.size) ? 
                            <div>
                                {this.loadConfirmations()}
                            </div> 
                            : null 
                        }
                    </div>
                </div>
                <h2>Board Games</h2>
                <div className="broughtgames">
                    {this.loadBoardgames()}
                </div>
            </div>
        )
    }
}

export default Meet
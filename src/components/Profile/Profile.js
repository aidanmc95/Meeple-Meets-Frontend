import React from 'react';
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import {api} from '../../services/api'
import './style.css'

class Profile extends React.Component {

    state = {
        user: {
            username: "",
            boardgames: [],
            BGGusername: "",
            meets: [],
            invites: [],
            created_at: null,
            email: "",
            address1: "",
            address2: "",
            zip: "",
            about_me: "Nothing to know about me.",
            as_host: "Nothing about how I am as a Host"
        }
    }

    componentDidMount() {
        if(this.props.user) {
            this.setState(prevState => ({
                ...prevState.user,
                user: this.props.user
            }))
        }
        if(this.props.user && this.props.user.id == this.props.match.params.profileid){
            this.props.history.push('/profile')
        } else if(this.props.match.params.profileid) {
            api.auth.getUser(this.props.match.params.profileid)
            .then(resp => this.setState(prevState=> ({
                ...prevState.user,
                user: resp
            })))
        }
    }

    componentDidUpdate() {
        if(this.props.user && this.props.user.id == this.props.match.params.profileid){
            this.props.history.push('/profile')
        }
    }

    loadBoardgames = () => {
        return this.state.user.boardgames.map(boardgame => <BoardgameTile key={boardgame.id} id={boardgame.id} boardgame={boardgame} />)
    }

    render() {
        return(
            <div>
                {!this.props.match.params.profileid ? <h5>Your Profile</h5> : null}
                <h1>{this.state.user.username}</h1>
                <h5>Hosted {this.state.user.meets.length} Meeple Meets</h5>
                <h5>Joined {this.state.user.invites.filter(invite => invite.state).length} Meeple Meets</h5>
                <h5>Member Since {this.state.user.created_at}</h5>
                <h2>Your Games</h2>
                <div className="carousel">

                </div>
                <h2>User Profile</h2>
                <div className="userinfo">
                    <div className="info">

                        <h2>About Me</h2>
                        <h5>{this.state.user.about_me}</h5>
                        <h2>As a Host</h2>
                        <h5>{this.state.user.as_host}</h5>
                    </div>
                    <div className="sidegames">

                    </div>
                </div>
                <div className="grid-container">
                    {this.loadBoardgames()}
                </div>
            </div>
        )
    }
}

export default Profile
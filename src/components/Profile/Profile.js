import React from 'react';
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import {api} from '../../services/api'
import './style.css'

class Profile extends React.Component {

    state = {
        user: {
            username: "",
            boardgames: []
        }
    }

    componentDidMount() {
        if(this.props.user) {
            this.setState({
                user: this.props.user
            })
        }
        if(this.props.user && this.props.user.id == this.props.match.params.profileid){
            this.props.history.push('/profile')
        } else if(this.props.match.params.profileid) {
            api.auth.getUser(this.props.match.params.profileid)
            .then(resp => this.setState({
                user: resp
            }))
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
                <h5>Your Profile</h5>
                <h1>{this.state.user.username}</h1>
                <div className="grid-container">
                    {this.loadBoardgames()}
                </div>
            </div>
        )
    }
}

export default Profile
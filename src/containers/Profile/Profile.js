import React from 'react';
import BoardgamesSubset from '../../components/BoardgamesSubset/BoardgamesSubset'
import BoardgameSidebarTile from '../../components/BoardgameSidebarTile/BoardgameSidebarTile'
import Carousel from '../../components/Carousel/Carousel'
import {api} from '../../services/api'
import './style.css'

class Profile extends React.Component {

    state = {
        meetsPage: false,
        boardgamesPage: false,
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
        if(this.props.user && this.props.user.id == this.props.match.params.profileid){
            this.props.history.push('/profile')
        } else if(this.props.match.params.profileid) {
            api.auth.getUser(this.props.match.params.profileid)
            .then(resp => {
                this.setState(prevState=> ({
                    user: {
                        ...prevState.user,
                        ...resp
                    }
                }))
            })
        }

        if(this.props.user) {
            this.setState(prevState => ({
                user:{
                    ...prevState.user,
                    ...this.props.user
                },
                boardgamesPage: false
            }))
        }
    }

    componentDidUpdate() {
        if(this.props.user && this.props.user.id == this.props.match.params.profileid){
            this.props.history.push('/profile')
        }

        if(this.props.user && this.props.user.id != this.state.user.id && !this.props.match.params.profileid) {
            this.setState(prevState => ({
                user:{
                    ...prevState.user,
                    ...this.props.user
                }
            }))
        } else if(this.state.user.id != this.props.match.params.profileid && this.props.match.params.profileid) {
            api.auth.getUser(this.props.match.params.profileid)
            .then(resp => {
                this.setState(prevState=> ({
                    user: {
                        ...prevState.user,
                        ...resp
                    }
                }))
            })
        }
    }

    loadBoardgameTiles = () => {
        return this.state.user.boardgames.slice(0, 4).map(boardgame => <BoardgameSidebarTile key={boardgame.id} id={boardgame.id} boardgame={boardgame} />)
    }

    boardgamesPagebolean = () => {
        this.setState(prevState => ({
            boardgamesPage: !prevState.boardgamesPage
        }))
    }

    render() {
        return(
            <div className="centered">
                {!this.state.boardgamesPage? 
                    <div>
                        {!this.props.match.params.profileid ? <h4 style={{"font-weight": "bold"}}>Your Profile</h4> : null}
                        <h1>{this.state.user.username}</h1>
                        <h5 style={{display: "inline"}}>Hosted {this.state.user.meets.length} Meeple Meets    </h5>
                        <h5 style={{display: "inline"}}>Joined {this.state.user.invites.filter(invite => invite.status).length} Meeple Meets</h5>
                        <h5>Member Since {new Date(this.state.user.created_at).toJSON().slice(0,10).replace(/-/g,'/')}</h5>

                        <h3>{!this.props.match.params.profileid? "Your":"Their"} Games</h3>
                        <Carousel boardgames={this.state.user.boardgames}></Carousel>

                        <div className="userinfo">
                            <div className="leftSide">
                                <h3>User Profile</h3>
                                <div className='privateInfo'>
                                    <h4 style={{color: "#59576C", "font-weight": "bold", display: "inline"}}>Private Information </h4>
                                    {!this.props.match.params.profileid ? <a style={{display: "inline"}}><img src={process.env.PUBLIC_URL + '/edit.png'} alt="Edit" /></a>: null}
                                    {!this.props.match.params.profileid ? 
                                        <div>
                                            <h6>This information is only shown if you are friends with another player, or if you give permission to a new guest to see it.</h6>
                                            <h5>Email:            <h6 style={{display: "inline"}}>{this.state.user.email}</h6></h5>
                                            <h5>Address:       <h6 style={{display: "inline"}}>{this.state.user.address1}</h6></h5>
                                        </div>
                                        : <h6>This info is protected and only accessable by the user.</h6>
                                    }
                                </div>
                                <h3 style={{display: "inline"}}>About {!this.props.match.params.profileid? "Me":"Them"}</h3>
                                {!this.props.match.params.profileid ? <a style={{display: "inline"}}><img src={process.env.PUBLIC_URL + '/edit.png'} alt="Edit" /></a> : null}<br/>
                                <p>{this.state.user.about_me? this.state.user.about_me:"Nothing to know about me."}</p><br/>
                                <h3 style={{display: "inline"}}>As a Host </h3>
                                {!this.props.match.params.profileid ? <a style={{display: "inline"}}><img src={process.env.PUBLIC_URL + '/edit.png'} alt="Edit" /></a> : null}<br/>
                                <p>{this.state.user.as_host? this.state.user.as_host:"Nothing to know about me."}</p><br/>
                            </div>
                            <div>
                                <h5>{!this.props.match.params.profileid? "Your":"Their"} Board Games</h5> 
                                <div>
                                    {this.loadBoardgameTiles()}
                                    <h6><a onClick={() => this.boardgamesPagebolean()}>View all of {!this.props.match.params.profileid? "your":"their"} games</a></h6>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <a onClick={() => this.boardgamesPagebolean()}>Back to User Profile</a>
                        <BoardgamesSubset boardgames={this.state.user.boardgames}/>
                    </div>
                }
            </div>
        )
    }
}

export default Profile
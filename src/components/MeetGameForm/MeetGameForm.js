import React from 'react';
import Modal from 'react-modal';
import BoardgameTile from '../BoardgameTile/BoardgameTile'
import {api} from '../../services/api'
import { relativeTimeRounding } from 'moment';
import './style.css'

const customStyles = {
  content : {
    position              : 'relative',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '70%',
    height: '500px', // <-- This sets the height
    overlfow: 'scroll'
  }
};

export default function MeetGameForm(props){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal(){
        setIsOpen(false);
    }

    const addGame = (id) => {
        if(props.user) {
            api.auth.createBrought({
                boardgame_id: id,
                meet_id: props.meet.id,
            })
            .then(resp => props.addBroughtGame(resp))
        }
    }

    const loadBoardgames = () => {
        if(props.user) {
            return props.user.boardgames.map(boardgame => <div>
                <BoardgameTile key={boardgame.id} id={boardgame.id} boardgame={boardgame} />
                {!props.meet.brought_games.filter(brought_game => brought_game.boardgame.id === boardgame.id)[0] ? <button onClick={() => addGame(boardgame.id)}>Add Game</button> : null}
            </div>)
        }
    }

    return (
      <div>
        <a className="navbutton2" onClick={openModal}>Add Board Game</a>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

            <h2 ref={_subtitle => (subtitle = _subtitle)}>Add to Meet</h2>
            <div className="grid-container">
                {loadBoardgames()}
            </div>
        </Modal>
      </div>
    );
}
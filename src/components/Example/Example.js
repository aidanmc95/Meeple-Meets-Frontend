import React from 'react';
import Modal from 'react-modal';
import Login from '../Login/Login'
import MeetsForm from '../MeetsForm/MeetsForm'
import { relativeTimeRounding } from 'moment';

const customStyles = {
  content : {
    position              : 'relative',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '70%'
  }
};

export default function Example(props){
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

    return (
      <div>
        <a className="navbutton" onClick={openModal}>Open Modal</a>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

            <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
            <MeetsForm {...props} closeModal={closeModal}/>
        </Modal>
      </div>
    );
}
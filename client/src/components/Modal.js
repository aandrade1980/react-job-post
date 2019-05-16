import React from 'react';
import styled from 'styled-components';

import Login from './Login';
import SignUp from './SignUp';

import { UserConsumer } from '../context';

import { FORM_LOGIN } from '../utilities/constants';

const Modal = () => {
  return (
    <UserConsumer>
      { value => {
          const { openModal, setOpenModal } = value;
          return (
            openModal.show && 
            <ModalContainer className="modal-container">
              <div id="modal">
                <i className="fas fa-times-circle" onClick={ () => setOpenModal({ ...openModal, show: false }) }></i>
                { openModal.form === FORM_LOGIN ? 
                  <Login /> :
                  <SignUp />
                }
              </div>
            </ModalContainer>
          );
      }}
    </UserConsumer>
  )
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8000;
  #modal { 
    background: #fff;
    box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
    border-radius: 5px
  };
  .fa-times-circle {
    float: right;
    position: relative;
    right: -17px;
    top: -17px;
    cursor: pointer;
    font-size: 26px;
    color: #fff;
    &:hover { color: #ff6b6b }
  }
`;

export default Modal;

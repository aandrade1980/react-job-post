import React from 'react';

import Modal from './Modal';
import Alert from './Alert';

import { UserConsumer } from '../context';

import { FORM_LOGIN, FORM_SING_UP } from '../utilities/constants';

const Home = () => {
  return (
    <UserConsumer>
      {value => {
        const { error, setError, setOpenModal } = value; 
        return (
          <>
            { error && 
              <Alert error={ error } setError={ setError } /> 
            }
            <Modal />
            <div className="d-flex justify-content-center m-top-125">
              <button 
                type="button" 
                className="btn btn-outline-dark btn-lg mr-5" 
                onClick={ () => setOpenModal({ show: true, form: FORM_LOGIN }) }>
                <i className="fas fa-sign-in-alt mr-1"></i>
                Login
              </button>
              <button 
                type="button" 
                className="btn btn-outline-dark btn-lg"
                onClick={ () => setOpenModal({ show: true, form: FORM_SING_UP }) }
                >
                <i className="fas fa-user-plus mr-1"></i>
                Sign Up
              </button>
            </div>
          </>
        )}
      }
    </UserConsumer>
  )
}

export default Home;

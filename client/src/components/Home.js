import React, { lazy, Suspense } from 'react';

import { UserConsumer } from '../context';
import { FORM_LOGIN, FORM_SING_UP } from '../utilities/constants';

const Alert = lazy(() => import('./Alert'));
const Modal = lazy(() => import('./Modal'));

const Home = () => {
  return (
    <UserConsumer>
      { value => {
        const { error, setError, setOpenModal } = value; 
        return (
          <>
            { error &&
              <Suspense fallback={ <div>Loading...</div> }>
                <Alert error={ error } setError={ setError } /> 
              </Suspense>
            }
            <Suspense fallback={ <div>Loading...</div> }>
              <Modal />
            </Suspense>
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

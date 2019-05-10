import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { UserConsumer } from '../context';
import Alert from './Alert';
import BackTo from './BackTo';

import { GOOGLE_PROVIDER, GITHUB_PROVIDER } from '../utilities/constants';

function Login({ history }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = evt => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value
  });
  
  return (
    <UserConsumer>
      { value => {
        return (
          <>
            <BackTo toLink="singup" toText="Sing Up" />
            { value.error && 
              <Alert error={ value.error } setError={ value.setError } />
            }
            <form style={{ minWidth: '450px', margin: '4rem auto' }} className="form w-25" onSubmit={ evt => value.logIn(evt, formData.email, formData.password, history) }>
            <h3 className="mb-3 text-center">Login</h3>
            <div className="mb-4 mt-4 d-flex justify-content-center">
              <button 
                  onClick={ () => value.providerSignIn(GOOGLE_PROVIDER, history) }
                  className="btn btn-outline-primary provider-login-button mr-5"
                >
                  <i className="fab fa-google mr-2"></i>
                </button>
                <button 
                  onClick={ () => value.providerSignIn(GITHUB_PROVIDER, history) }
                  className="btn btn-outline-dark provider-login-button"
                >
                  <i className="fab fa-github-alt mr-2"></i>
                </button>
            </div>
            <hr/>
            <div className="form-group mt-4">
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
                autoComplete="off"
                name="email"
                value={formData.email}
                onChange={event => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={event => handleInputChange(event)}
                required
              />
            </div>
            <button className="btn btn-success btn-block mr-2" type="submit" disabled={ value.isFetching }>
              { value.isFetching ? 'Fetching...' : 'Login' }
              <i className="fas fa-sign-in-alt ml-2"></i>
            </button>
          </form>
         </>
        );
      }} 
    </UserConsumer>
  );
}

export default withRouter(Login);

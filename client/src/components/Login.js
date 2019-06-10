import React, { useState } from 'react';

import { UserConsumer } from '../context';

import { GOOGLE_PROVIDER, GITHUB_PROVIDER } from '../utilities/constants';

function Login() {
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
        const { email, password } = formData;
        const { logIn, providerSignIn, isFetching } = value;
        return (
          <>
            <form 
              style={{ minWidth: '450px' }} 
              className="form w-25" 
              onSubmit={ evt => logIn(evt, email, password) }
            >
            <h3 className="mb-3 text-center">Login</h3>
            <div className="mb-4 mt-4 d-flex justify-content-center">
              <button 
                  onClick={ evt => providerSignIn(evt, GOOGLE_PROVIDER) }
                  className="btn btn-outline-primary provider-login-button mr-5"
                >
                  <i className="fab fa-google mr-2"></i>
                </button>
                <button 
                  onClick={ evt => providerSignIn(evt, GITHUB_PROVIDER) }
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
                value={email}
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
                value={password}
                onChange={event => handleInputChange(event)}
                required
              />
            </div>
            <button className="btn btn-success btn-block mr-2" type="submit" disabled={ isFetching }>
              { isFetching ? 'Fetching...' : 'Login' }
              <i className="fas fa-sign-in-alt ml-2"></i>
            </button>
          </form>
         </>
        );
      }} 
    </UserConsumer>
  );
}

export default Login;

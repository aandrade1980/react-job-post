import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { UserConsumer } from '../context';
import Alert from './Alert';
import BackTo from './BackTo';

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
            <div className="form-group">
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
            <button className="btn btn-success mr-2" type="submit" disabled={ value.isFetching }>
              { value.isFetching ? 'Fetching...' : 'Login' }
              <i className="fas fa-sign-in-alt ml-2"></i>
            </button>
            <button 
                onClick={ () => value.googleSignIn(history) }
                className="btn btn-primary"
              >
                <i className="fab fa-google mr-1"></i>
                Login with Google
              </button>
          </form>
         </>
        );
      }} 
    </UserConsumer>
  );
}

export default withRouter(Login);

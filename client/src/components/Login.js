import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Alert from './Alert';

import { UserConsumer } from '../context';

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
            { value.error && 
              <Alert error={ value.error } setError={ value.setError } />
            }
            <form style={{ minWidth: '450px' }} className="form w-25" onSubmit={ evt => value.logIn(evt, formData.email, formData.password, history) }>
            <h3 className="mb-3 text-center">Login</h3>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
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
            <button className="btn btn-success btn-block" type="submit" disabled={ value.isFetching }>
              { value.isFetching ? 'Fetching...' : 'Submit' }
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

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { UserConsumer } from '../context';

import BackTo from './BackTo';

import Alert from './Alert';

function SignUp({ history }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
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
            <BackTo toLink="login" toText="Login" />
            { value.error && 
              <Alert error={ value.error } setError={ value.setError }/>
            }
            <form style={{ minWidth: '450px' }} className="form w-25" onSubmit={ evt => value.createUser(evt, formData.email, formData.password, formData.name, history) }>
            <h3 className="text-center mb-3">Sign Up</h3>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                autoComplete="off"
                name="name"
                value={formData.name}
                onChange={event => handleInputChange(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
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
                placeholder="Choose a secure password"
                name="password"
                value={formData.password}
                onChange={event => handleInputChange(event)}
                required
              />
            </div>
            <button className="btn btn-success btn-block" type="submit" disabled={ value.isFetching }>  
              { value.isFetching ? 'Fetching' : 'Submit'}
              <i className="fas fa-user-plus ml-2"></i>
            </button>
          </form>
          </>
        )
      }}
    </UserConsumer>
  )
}

export default withRouter(SignUp);

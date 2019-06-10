import React, { useState } from 'react';

import { UserConsumer } from '../context';

function SignUp() {
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
        const { email, password, name } = formData;
        const { createUser, isFetching } = value;
        return (
          <>
            <form style={{ minWidth: '450px' }} className="form w-25" onSubmit={ evt => createUser(evt, email, password, name) }>
            <h3 className="text-center mb-3">Sign Up</h3>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                autoComplete="off"
                name="name"
                value={name}
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
                value={email}
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
                value={password}
                onChange={event => handleInputChange(event)}
                required
              />
            </div>
            <button className="btn btn-success btn-block" type="submit" disabled={ isFetching }>  
              { isFetching ? 'Fetching' : 'Submit'}
              <i className="fas fa-user-plus ml-2"></i>
            </button>
          </form>
          </>
        )
      }}
    </UserConsumer>
  )
}

export default SignUp;

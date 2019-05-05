import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { UserConsumer } from '../context';

function SignUp({ history }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleInputChange = evt => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value
  })

  return (
    <UserConsumer>
      { value => {
        return (
          <form className="form signup" onSubmit={ (evt) => value.createUser(evt, formData.email, formData.password, formData.name, history) }>
            <h2>Sign Up</h2>
            <input
              className="form-input"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={event => handleInputChange(event)}
              required
            />
            <input
              className="form-input"
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={event => handleInputChange(event)}
              required
            />
            <input
              className="form-input"
              type="password"
              placeholder="Choose a secure password"
              name="password"
              value={formData.password}
              onChange={event => handleInputChange(event)}
              required
            />
            <button className="form-submit" type="submit">Submit</button>
          </form>
        )
      }}
    </UserConsumer>
  )
}

export default withRouter(SignUp);

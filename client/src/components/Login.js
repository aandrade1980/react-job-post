import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import fBase from '../utilities/firebase';

function Login({ history }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = evt => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value
  });

  const onFormSubmit = async evt => {
    evt.preventDefault();
    await fBase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(() => history.push("/"))
      .catch(error => console.log("Error =>", error.message));
  }

  return (
    <form className="form login" onSubmit={onFormSubmit}>
      <h2>Login</h2>
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
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={event => handleInputChange(event)}
        required
      />
      <button className="form-submit" type="submit">Submit</button>
    </form>
  );
}

export default withRouter(Login);

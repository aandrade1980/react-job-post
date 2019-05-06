import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import fBase from '../utilities/firebase';

function Login({ history }) {
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = evt => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value
  });

  const onFormSubmit = async evt => {
    setIsFetching(true);
    evt.preventDefault();
    await fBase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(() => history.push("/"))
      .catch(error => console.log("Error =>", error.message))
      .finally(() => setIsFetching(false));
  }

  return (
    <form className="form" onSubmit={onFormSubmit}>
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
      <button className="btn btn-success btn-block" type="submit" disabled={ isFetching }>
        { isFetching ? 'Fetching...' : 'Submit' }
        <i className="fas fa-sign-in-alt ml-2"></i>
      </button>
    </form>
  );
}

export default withRouter(Login);

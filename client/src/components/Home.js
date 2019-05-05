import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex justify-content-center m-top-125">
      <Link className="links" to="/login">Login</Link>
      <Link className="links" to="/singup">SignUp</Link>
    </div>
  )
}

export default Home;

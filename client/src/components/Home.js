import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex justify-content-center m-top-125">
      <button type="button" className="btn btn-outline-dark btn-lg mr-5">
        <i className="fas fa-sign-in-alt mr-1"></i>
        <Link className="links" to="/login">Login</Link>
      </button>
      <button type="button" className="btn btn-outline-dark btn-lg">
        <i className="fas fa-user-plus mr-1"></i>
        <Link className="links" to="/singup">Sign Up</Link>
      </button>
    </div>
  )
}

export default Home;

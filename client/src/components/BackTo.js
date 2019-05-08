import React from 'react';
import { Link } from 'react-router-dom';

const BackTo = ({ toLink, toText }) => {
  return (
    <>
      <Link className="ml-5" to={`/${toLink}`}><i className="fas fa-arrow-left mr-1"></i>{ toText }</Link>
    </>
  )
};

export default BackTo;

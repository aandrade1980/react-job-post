import React from 'react';
import { Link } from 'react-router-dom';

const BackTo = (props: { toLink: string, toText: string }) => {
  return (
    <>
      <Link className="ml-5" to={`/${props.toLink}`}><i className="fas fa-arrow-left mr-1"></i>{ props.toText }</Link>
    </>
  )
};

export default BackTo;

import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

export default function Header({ title }) {
  return (
    <header className="header">
      <h1>
        { title }
      </h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: 'Job Posts'
};

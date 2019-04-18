import React, { memo } from 'react';

import './Header.scss';

export default memo(function Header({ title }) {
  return (
    <header className="header">
      <h1>
        { title }
      </h1>
    </header>
  )
});

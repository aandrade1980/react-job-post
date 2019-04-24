import * as React from 'react';

import './Header.scss';

interface Props {
  title: string;
}

const Header: React.FunctionComponent<Props> = props => {
  return (
    <header className="header">
      <h1>
        { props.title }
      </h1>
     </header>
  )
};

export default React.memo(Header);

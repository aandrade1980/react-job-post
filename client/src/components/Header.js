import * as React from 'react';
import { UserConsumer } from '../context';

import './Header.scss';

const Header = ({ user, title }) => {
  return (
    <UserConsumer>
      { value => {
        return (
          <header className="header">
            <h1 className="flex-grow-1 text-center">
              { title }
            </h1>
            { user && user.displayName &&
              <button className="btn btn-outline-light mr-2" onClick={ value.logOut }>
                <span className="text-lowercase">
                  <i className="far fa-user mr-2"></i>
                  { user && user.displayName }
                </span>
              </button>
            }
          </header>
        )
      }}
    </UserConsumer>
  )
};

export default React.memo(Header);

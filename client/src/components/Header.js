import * as React from 'react';
import { UserConsumer } from '../context';
import { withRouter } from 'react-router-dom';

import './Header.scss';

const Header = ({ user, title, history }) => {
  return (
    <UserConsumer>
      { value => {
        return (
          <header className="header">
            <h1 className="flex-grow-1 text-center">
              { title }
            </h1>
            { user && user.displayName &&
              <button className="btn btn-outline-light mr-2" onClick={ evt => value.logOut(evt, history) }>
                <img className="mr-2" style={{ height: '40px', borderRadius: '50%' }} src={ user.photoURL } alt="User" />
                <span>
                  { user && !user.photoURL && <i className="far fa-user mr-2"></i> }
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

export default React.memo(withRouter(Header));

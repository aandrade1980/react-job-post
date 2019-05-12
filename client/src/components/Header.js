import * as React from 'react';
import { UserConsumer } from '../context';
import { withRouter } from 'react-router-dom';

import './Header.scss';

const Header = ({ title, history }) => {
  return (
    <UserConsumer>
      { value => {
        const { user, logOut } = value;
        return (
          <header className="header">
            <h1 className="flex-grow-1 text-center">
              { title }
            </h1>
            { user &&
              <button className="btn btn-outline-light mr-2" onClick={ evt => logOut(evt, history) }>
                { user.photoURL && <img className="mr-2" style={{ height: '40px', borderRadius: '50%' }} src={ user.photoURL } alt="User" /> }
                <span>
                  { !user.photoURL && <i className="far fa-user mr-2"></i> }
                  { user.displayName }
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

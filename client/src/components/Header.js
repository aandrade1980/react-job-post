import * as React from "react";
import PropTypes from "prop-types";
import { UserConsumer } from "../context";

import "./Header.scss";

const Header = ({ title }) => {
  return (
    <UserConsumer>
      {value => {
        const { user, logOut } = value;
        return (
          <header className="header">
            <h1 className="flex-grow-1 text-center">{title}</h1>
            {user && (
              <button
                className="btn btn-outline-light mr-2"
                onClick={evt => logOut(evt)}
              >
                {user.photoURL && (
                  <img
                    className="mr-2"
                    style={{ height: "40px", borderRadius: "50%" }}
                    src={user.photoURL}
                    alt="User"
                  />
                )}
                <span>
                  {!user.photoURL && <i className="far fa-user mr-2" />}
                  {user.displayName}
                </span>
              </button>
            )}
          </header>
        );
      }}
    </UserConsumer>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

export default React.memo(Header);

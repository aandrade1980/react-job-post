import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { UserConsumer } from './context';
import './App.scss';

// Components
import Header from './components/Header';
import JobPost from './components/JobPost';
import JobPostList from './components/JobPostList';
import NewJobPost from './components/NewJobPost';
import Home from './components/Home';
import Login from './components/Login';
import SingUp from './components/SignUp';

const App = () => {
  const [user, setUser] = useState({ user: undefined });

  return (
    <>
      <Header title="Jobs" user={ user.user } />
        <main>
          <UserConsumer>
            { value => setUser(value.user) }
          </UserConsumer>
          {
            user.user && 
            <nav>
              <ul>
                <li>
                  <NavLink 
                    exact={true} 
                    to="/" 
                    activeClassName="selected"
                  >
                    Home
                    <i className="fas fa-home m-left-5"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/new-post" 
                    activeClassName="selected"
                  >
                    New Job
                    <i className="fas fa-file-alt m-left-5"></i>
                  </NavLink>
                </li>
              </ul>
            </nav>
          }
          <Switch>
            <Route 
              exact 
              path={["/new-post", "/updateJob/:id"]}
              component={ NewJobPost }
            />
            <Route 
              exact 
              path={"/jobPost/:jobId"}
              component={ JobPost }
            />
            <Route 
              exact 
              path={"/login"}
              component={ Login }
            />
            <Route 
              exact 
              path={"/singup"}
              component={ SingUp }
            />
            <Route 
              path="/"
              component={ user.user ? JobPostList : Home }
            />
          </Switch>
        </main>
    </>
  )
}

Route.propTypes = {
  path: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default App;

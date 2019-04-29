import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import PropTypes from "prop-types"

import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './components/Header';
import NewJobPost from './components/NewJobPost';
import JobPostList from './components/JobPostList';

class App extends Component {
  render() {
    return (
      <>
        <Header title="Jobs" />
        <Router>
          <main>
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
                  <NavLink to="/new-post" activeClassName="selected">New Job</NavLink>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route 
                exact 
                path={["/new-post", "/new-post/:id"]}
                component={ NewJobPost }
              />
              <Route 
                path="/"
                component={ JobPostList }
              />
            </Switch>
          </main>
        </Router>
      </>
    );
  }
}

Route.propTypes = {
  path: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default App;

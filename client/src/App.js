import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import './App.scss';
// Components
import Header from './components/Header';
import JobPost from './components/JobPost';
import JobPostList from './components/JobPostList';
import NewJobPost from './components/NewJobPost';

const App = () => {
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
              path="/"
              component={ JobPostList }
            />
          </Switch>
        </main>
      </Router>
    </>
  )
}

Route.propTypes = {
  path: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default App;

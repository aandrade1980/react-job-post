import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

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
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/new-post'>New Job</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route 
                exact 
                path="/new-post" 
                component={ NewJobPost }
                />
              <Route 
                exact 
                path="/new-post/:id" 
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

export default App;

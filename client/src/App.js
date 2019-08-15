import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import React, { lazy, Suspense } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { UserConsumer } from "./context";
import "./App.scss";

// Components
import Header from "./components/Header";
import JobPostList from "./components/JobPostList";
import Spinner from "./components/Spinner";
import Categories from "./components/Categories";

const JobPost = lazy(() => import("./components/JobPost"));
const NewJobPost = lazy(() => import("./components/NewJobPost"));
const Home = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <UserConsumer>
      {value => {
        const { user } = value;
        return (
          <>
            <Header title="Jobs" />
            <main>
              {user && (
                <nav>
                  <ul>
                    <li>
                      <NavLink exact={true} to="/" activeClassName="selected">
                        Home
                        <i className="fas fa-home m-left-5" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/new-post" activeClassName="selected">
                        New Job
                        <i className="fas fa-file-alt m-left-5" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/category" activeClassName="selected">
                        Categories
                        <i className="fa fa-list-alt m-left-5" />
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              )}
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route
                    exact
                    path={["/new-post", "/updateJob/:id"]}
                    component={NewJobPost}
                  />
                  <Route exact path={"/jobPost/:jobId"} component={JobPost} />
                  <Route exact path={"/category"} component={Categories} />
                  <Route path="/" component={user ? JobPostList : Home} />
                </Switch>
              </Suspense>
            </main>
          </>
        );
      }}
    </UserConsumer>
  );
};

Route.propTypes = {
  path: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default App;

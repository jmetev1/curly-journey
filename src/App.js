import React, { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { routeNames, Loading, Pretty } from './Fields';

const App = ({ wholeUser }) => {
  const { username } = wholeUser;
  const user = username === 'jmetevier' ? 'jpm' : 'uh oh'
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          {Object.keys(routeNames).map(string => {
            const componentName = string.split(' ').join('');
            return (
              <Route
                key={componentName}
                path={`/${componentName.toLowerCase()}`}
                render={props => {

                  const Component = lazy(() => import(`./${componentName}`));
                  return (
                    <Pretty user={user?.region}>
                      <Component {...props} user={user} />
                    </Pretty>
                  );
                }}
              />
            );
          })}
          {/* <Route
            path="/login"
            render={() => {
              // const Component = lazy(() => import('./LoginNew'));
              // const Component = lazy(() => import('./Login'));
              return <Component  user={user} />;
            }}
          /> */}
          <Route>
            <Redirect to={user ? '/home' : '/login'} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

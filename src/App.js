import React, { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { routeNames, Loading, Pretty } from './Fields';

const App = ({ userPromise }) => {
  const { stayLoggedIn } = window.pglOptions;
  const [loading, setLoading] = useState(!stayLoggedIn);
  const [user, setUser] = useState(stayLoggedIn ? 'test' : null);
  useEffect(() => {
    userPromise
      .then(res => res.json())
      .then(userFromServer => {
        if (!user) setUser(userFromServer);
        setLoading(false);
      })
      .catch(e => {
        throw new Error('app js setState on comp did mount', e);
      });
  }, [userPromise]);
  return loading ? (
    <Loading />
  ) : (
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
                  if (!user) return <Redirect to="/login" />;
                  else {
                    const Component = lazy(() => import(`./${componentName}`));
                    return (
                      <Pretty user={user}>
                        <Component {...props} user={user} />
                      </Pretty>
                    );
                  }
                }}
              />
            );
          })}
          <Route
            path="/login"
            render={() => {
              const Component = lazy(() => import(`./Login`));
              return <Component setUser={setUser} user={user} />;
            }}
          />
          <Route>
            <Redirect to={user ? '/addvisit' : '/login'} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    userPromise
      .then(res => res.json())
      .then(userFromServer => {
        console.log('app.js, user from server', userFromServer);
        setUser(userFromServer);
        setLoading(false);
      })
      .catch(e => {
        throw new Error(e, 'app js setState on comp did mount');
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
                      <Pretty user={user?.region}>
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
              const Component = lazy(() => import('./Login'));
              return <Component setUser={setUser} user={user} />;
            }}
          />
          <Route>
            <Redirect to={user ? '/home' : '/login'} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

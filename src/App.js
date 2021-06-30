import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/useAuthListener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/protected.route';
import isUserLoggedIn from './helpers/is-user-logged-in';

const Login = lazy(() => import ('./pages/Login'));
const Signup = lazy(() => import ('./pages/Signup'));
const Dashboard = lazy(() => import ('./pages/Dashboard'));
const NotFound = lazy(() => import ('./pages/NotFound'));

const App = () => {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact >
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App

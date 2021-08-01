import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import Medico from '../pages/Medico/Medico';
import useToken from '../useToken';
import Navbar from '../Navbar';
import Diagnosticar from '../pages/Medico/Diagnosticar';

function Routes() {
  const { token, setToken } = useToken();

  return (
    <Router>
      <div className="Routes">
        {token ? (<Navbar setToken={setToken} token={token} />) : null}
        {token ? (
          token === "admin" ? (
            <Switch>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="*">
                <Redirect to="/admin" />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/medico">
                <Medico />
              </Route>
              <Route exact path="/medico/diagnosticar">
                <Diagnosticar />
              </Route>
              <Route path="*">
                <Redirect to="/medico" />
              </Route>
            </Switch>
          )
        ) : (
          <Switch>
            <Route path="/" >
              <Login setToken={setToken} />
            </Route>
            <Route path="*" >
              <Redirect to="/" />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default Routes;

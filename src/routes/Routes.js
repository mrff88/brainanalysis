import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import Medico from '../pages/Medico/Medico';
import useToken from '../useToken';
import Navbar from '../Navbar';
import Diagnosticar from '../pages/Medico/Diagnosticar';
import AgregarPaciente from '../pages/Medico/AgregarPaciente';
import EditarPaciente from '../pages/Medico/EditarPaciente';
import AgregarUsuario from '../pages/Admin/AgregarUsuario';
import EditarUsuario from '../pages/Admin/EditarUsuario';

function Routes() {
  const { token, setToken } = useToken();

  return (
    <Router>
      <div className="Routes">
        {token ? (<Navbar setToken={setToken} token={token} />) : null}
        {token ? (
          token.token === "admin" ? (
            <Switch>
              <Route exact path="/admin">
                <Admin token={token}/>
              </Route>
              <Route exact path="/admin/agregar_usuario">
                <AgregarUsuario />
              </Route>
              <Route exact path="/admin/editar_usuario/:id">
                <EditarUsuario />
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
              <Route exact path="/medico/agregar_paciente">
                <AgregarPaciente />
              </Route>
              <Route exact path="/medico/diagnosticar">
                <Diagnosticar />
              </Route>
              <Route exact path="/medico/editar_paciente/:id">
                <EditarPaciente />
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

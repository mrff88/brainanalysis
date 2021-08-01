import { useState } from "react";
import PropTypes from 'prop-types';
import md5 from 'md5';
import './Login.css';
import { useHistory } from "react-router-dom";

async function loginUser(email, password) {
    // return fetch(`http://localhost:8000/users?email=${email}&password=${password}`)
    // .then(res => {
    //   if (!res.ok) {
    //     error = 'could not fetch the data for that resource';
    //   }
    //   return res.json();
    // })
    // .then(data => {
    //   if (data.length > 0) {
    //     let usuario = data[0];
    //     user = usuario.admin;
    //     isPending = false;
    //     error = null;
    //   } else {
    //     isPending = false;
    //     error = 'El usuario o la contraseña no son correctos';
    //   }
    // })
    // .catch(err => {
    //   if (err.name === 'AbortError') {
    //     console.log('fetch aborted');
    //   } else {
    //     isPending = false;
    //     error = err.message;
    //   }
    // });
    return fetch(`http://localhost:8000/users?email=${email}&password=${password}`)
        .then(data => data.json())
}

const Login = ({ setToken }) => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isPending, setIsPending] = useState(false);
    // const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(email, md5(password));
        setToken({ token: token[0].admin === 1 ? 'admin' : 'medico' });
        console.log(token);
        history.push(token[0].admin === 1 ? '/admin' : '/medico')
    }

    return (
        <div className="login">
            <div className="text-center">
                <div className="form-signin">
                    <form onSubmit={handleSubmit}>
                        <h1 className="mb-3 fs-1 fw-bold">Brain Analysis</h1>
                        <br />
                        <br />
                        <div className="form-floating">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="floatingInput"
                            />
                            <label htmlFor="floatingInput">Correo Electrónico: </label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="floatingPassword"
                            />
                            <label htmlFor="floatingPassword">Contraseña: </label>
                        </div>

                        {/* {error && <div>{error}</div>} */}
                        <br />
                        {/* {!isPending && <button className="btn btn-primary">Iniciar Sesión</button>} */}
                        <button className="w-100 btn btn-lg btn-primary">Iniciar Sesión</button>
                        {/* {isPending && <button className="btn btn-primary" disabled>Iniciando...</button>} */}
                    </form>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
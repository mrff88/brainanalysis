import { useState } from "react";
import PropTypes from 'prop-types';
import md5 from 'md5';
import './Login.css';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        fetch(`http://localhost:8000/users?email=${email}&password=${md5(password)}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                if (data.length > 0) {
                    if (data[0].status) {
                        setIsPending(false);
                        setError(null);
                        setToken({
                            token: {
                                token: data[0].admin === 1 ? 'admin' : 'medico',
                                data: data[0].id
                            }
                        });
                    } else {
                        setIsPending(false);
                        setError('El usuario no esta activo');
                    }
                } else {
                    setIsPending(false);
                    setError('El usuario o la contraseña no son correctos');
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });
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
                        <br />
                        {!isPending && <button className="w-100 btn btn-lg btn-primary">Iniciar Sesión</button>}
                        {isPending && <button className="w-100 btn btn-lg btn-primary" disabled>Iniciando...</button>}
                    </form>
                    {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
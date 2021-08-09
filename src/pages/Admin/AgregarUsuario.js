import md5 from "md5";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AgregarUsuario = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState(0);
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { nombres: nombres, apellidos: apellidos, DNI: dni, email: email, admin: parseInt(admin), password: md5(password), status: 1 };

        setIsPending(true);

        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        .then(res => {

            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            } else {
                console.log('Nuevo usuario agregado');
                setIsPending(false);
                history.push('/admin');
            }
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted');
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })


    }

    return (
        <div className="agregar-usuario">
            <h2 className="my-3" >Agregar Nuevo Usuario</h2>
            <form className="baform py-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label"><strong>Nombres</strong>:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombres"
                        required
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label"><strong>Apellidos:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellidos"
                        required
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label"><strong>DNI</strong>:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dni"
                        required
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><strong>Email</strong>:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="admin" className="form-label"><strong>Tipo de usuario</strong>:</label>
                    <select
                        className="form-select"
                        id="admin"
                        required
                        value={admin}
                        onChange={(e) => setAdmin(e.target.value)}
                    >
                        <option value="0">Medico</option>
                        <option value="1">Administrador</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><strong>Constraseña</strong>:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>
                <div className="d-flex flex-row justify-content-between pt-3">
                    {!isPending && <Link to="/admin"><button className="w-100 me-3 btn btn-lg btn-secondary"><strong>Cancelar</strong></button></Link>}
                    {!isPending && <button className="w-100 ms-3 btn btn-lg btn-primary"><strong>Agregar</strong></button>}
                    {isPending && <button className="w-100 me-3 btn btn-lg btn-secondary" disabled><strong>Cancelar</strong></button>}
                    {isPending && <button className="w-100 ms-3 btn btn-lg btn-primary" disabled><strong>Agregando...</strong></button>}
                </div>
            </form>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </div>
    );
}

export default AgregarUsuario;
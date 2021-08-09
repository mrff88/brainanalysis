import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AgregarPaciente = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [dni, setDni] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const paciente = { nombres: nombres, apellidos: apellidos, DNI: dni };

        setIsPending(true);

        fetch('http://localhost:8000/patients', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paciente)
        })
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            } else {
                console.log('Nuevo paciente agregado');
                setIsPending(false);
                history.push('/medico');
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
        <div className="agregar-paciente">
            <h2 className="my-3" >Agregar Nuevo Paciente</h2>
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
                <div className="d-flex flex-row justify-content-between pt-3">
                    {!isPending && <Link to="/medico"><button className="w-100 me-3 btn btn-lg btn-secondary"><strong>Cancelar</strong></button></Link>}
                    {!isPending && <button className="w-100 ms-3 btn btn-lg btn-primary"><strong>Agregar</strong></button>}
                    {isPending && <button className="w-100 me-3 btn btn-lg btn-secondary" disabled><strong>Cancelar</strong></button>}
                    {isPending && <button className="w-100 ms-3 btn btn-lg btn-primary" disabled><strong>Agregando...</strong></button>}
                </div>
            </form>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </div>
    );
}

export default AgregarPaciente;
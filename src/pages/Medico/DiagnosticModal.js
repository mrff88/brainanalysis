import { useState } from "react";
import { useHistory } from "react-router-dom";

const DiagnosticModal = ({ tempdata, hide }) => {
    let history = useHistory();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
    const handleSubmit = (e) => {
        const diagnostic = {
            patientid: tempdata.patientid,
            lobe: tempdata.lobe,
            porcentaje: tempdata.porcentaje,
            fecha: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        fetch(`http://localhost:8000/medicalhistory`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(diagnostic)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                } else {
                    history.push('/medico')
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
        <div className="modal show fade" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">Resultado</div>
                    <div className="modal-body">
                        <div className=" p-3 m-3 d-flex flex-row justify-content-evenly">
                            <div>
                                <p className="card-text"><strong>Daño del lobulo: </strong></p>
                                <p className="card-text"><strong>Porcentaje: </strong></p>
                            </div>
                            <div>
                                <p className="card-text">{tempdata.lobe}</p>
                                <p className="card-text">{tempdata.porcentaje * 100}%</p>
                            </div>
                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    </div>
                    <div className="modal-footer">
                        {isPending && <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hide}>Cancelar</button>}
                        {isPending && <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>}
                        {!isPending && <button type="button" className="btn btn-secondary" disabled><strong>Cancelar</strong></button>}
                        {!isPending && <button type="button" className="btn btn-primary" disabled><strong>Guardando...</strong></button>}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DiagnosticModal;
import { useState } from "react";
import { useHistory } from "react-router-dom";

const StatusConfirmModal = ({ tempdata, hide }) => {
    let history = useHistory();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
    const handleSubmit = (e) => {
        const user = { nombres: tempdata.nombres, apellidos: tempdata.apellidos, DNI: tempdata.DNI, email: tempdata.email, admin: parseInt(tempdata.admin), password: tempdata.password, status: tempdata.status ? 0 : 1 };
        fetch(`http://localhost:8000/users/${tempdata.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                } else {
                    history.push('/')
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
                    <div className="modal-header"></div>
                    <div className="modal-body">
                        {
                            tempdata.status ?
                                <div>{`¿Esta seguro que desea desactivar al usuario ${tempdata.nombres}?`}</div>
                                :
                                <div>{`¿Esta seguro que desea activar al usuario ${tempdata.nombres}?`}</div>
                        }
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    </div>
                    <div className="modal-footer">
                        {isPending && <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hide}>Cancelar</button>}
                        {isPending && <button type="button" className="btn btn-primary" onClick={handleSubmit}>Aceptar</button>}
                        {!isPending && <button type="button" className="btn btn-secondary" disabled><strong>Cancelar</strong></button>}
                        {!isPending && <button type="button" className="btn btn-primary" disabled><strong>Guardando...</strong></button>}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default StatusConfirmModal;
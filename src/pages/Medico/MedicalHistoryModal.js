import useFetch from "../../useFetch";

const MedicalHistoryModal = ({ tempdata, hide }) => {
    const { data: diagnostics, isPending, error } = useFetch(`http://localhost:8000/medicalhistory?patientid=${tempdata}`);
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
    return (
        <div className="modal show fade" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Historial Médico</h5>
                        <button type="button" className="btn-close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        {isPending && <div>Cargando...</div>}
                        {diagnostics && diagnostics.map(diagnostic => {
                            return <div className="card p-3 m-3 d-flex flex-row justify-content-evenly" key={diagnostic.id}>
                                <div>
                                    <p className="card-text"><strong>Daño del lobulo: </strong></p>
                                    <p className="card-text"><strong>Porcentaje: </strong></p>
                                    <p className="card-text"><strong>Fecha: </strong></p>
                                </div>
                                <div>
                                    <p className="card-text">{diagnostic.lobe}</p>
                                    <p className="card-text">{diagnostic.porcentaje * 100}%</p>
                                    <p className="card-text">{diagnostic.fecha.split(' ')[0]}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MedicalHistoryModal;
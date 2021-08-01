import useFetch from "../../useFetch";
import PatientList from "./PatientList";

const Medico = () => {
    const { data: patients, isPending, error } = useFetch('http://localhost:8000/patients');

    return (
        <div className="medico">
            { error && <div>{ error }</div> }
            { isPending && <div>Cargando...</div> }
            { patients && <PatientList patients = {patients}/>}
        </div>
    );
}

export default Medico;
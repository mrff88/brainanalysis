import useFetch from "../../useFetch";
import FormDiagnosticar from "./FormDiagnosticar";


const Diagnosticar = () => {
    const { data: patients, isPending, error } = useFetch('http://localhost:8000/patients');

    return (
        <div className="agregar-paciente">
            {error && <div>{error}</div>}
            {isPending && <div>Cargando...</div>}
            {patients && <FormDiagnosticar patients={patients} />}
        </div>
    );
}

export default Diagnosticar;
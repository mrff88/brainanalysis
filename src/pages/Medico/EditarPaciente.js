import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import FormEditar from "./FormEditar";

const EditarPaciente = () => {
    const { id } = useParams()
    const { data: patient, isPending, error } = useFetch(`http://localhost:8000/patients/${id}`);

    return (
        <div className="editar-paciente">
            { error && <div>{ error }</div> }
            { isPending && <div>Cargando...</div> }
            { patient && <FormEditar patient = {patient} id = {id} />}
        </div>
    );
}
 
export default EditarPaciente;
import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import FormEditarUsuario from "./FormEditarUsuario";

const EditarUsuario = () => {
    const { id } = useParams()
    const { data: user, isPending, error } = useFetch(`http://localhost:8000/users/${id}`);

    return (
        <div className="editar-usuario">
            { error && <div>{ error }</div> }
            { isPending && <div>Cargando...</div> }
            { user && <FormEditarUsuario user = {user} id = {id} />}
        </div>
    );
}
 
export default EditarUsuario;
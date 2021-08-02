import { useMemo } from "react";
import useFetch from "../../useFetch";
import PatientList from "./PatientList";

const Medico = () => {
    const { data: patients, isPending, error } = useFetch('http://localhost:8000/patients');
    const columns = useMemo(
        () => [
            {
                Header: 'Nombres',
                accessor: 'nombres',
            },
            {
                Header: 'Apellidos',
                accessor: 'apellidos'
            },
            {
                Header: 'DNI',
                accessor: 'DNI'
            },
            {
                Header: 'Acción',
                Cell: ({ cell }) => (
                    // <button value={cell.row.original.id}>
                    //   editar {console.log(cell.row.original.id)}
                    // </button>
                    <div className="d-flex flex-row justify-content-center">
                        <div className="icon mx-3">
                            <svg
                                width="1.3em"
                                height="1.3em"
                                viewBox="0 0 16 16"
                                className="bi bi-pencil-fill"
                                fill="#084f98"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z"
                                />
                            </svg>
                        </div>
                        <div className="icon">
                            <svg
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 16 16"
                                className="bi bi-eye-fill"
                                fill="#084f98"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                                />
                            </svg>
                        </div>
                    </div>
                )
            }
        ],
        []
    )

    return (
        <div className="medico">
            {error && <div>{error}</div>}
            {isPending && <div>Cargando...</div>}
            {patients && <PatientList columns={columns} patients={patients} />}
        </div>
    );
}

export default Medico;
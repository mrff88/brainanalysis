import { useMemo } from "react";
import useFetch from "../../useFetch";
import UserList from "./UserList";

const Admin = () => {
    const { data: users, isPending, error } = useFetch('http://localhost:8000/users');
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
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Tipo de Usuario',
                accessor: 'admin'
            },
            {
                Header: 'Estado',
                accessor: 'status'
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
                                className="bi bi-person-x-fill"
                                fill="#084f98"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm6.146-2.854a.5.5 0 01.708 0L14 6.293l1.146-1.147a.5.5 0 01.708.708L14.707 7l1.147 1.146a.5.5 0 01-.708.708L14 7.707l-1.146 1.147a.5.5 0 01-.708-.708L13.293 7l-1.147-1.146a.5.5 0 010-.708z"
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
        <div className="admin">
            {error && <div>{error}</div>}
            {isPending && <div>Cargando...</div>}
            {users && <UserList columns={columns} users={users} />}
        </div>
    );
}

export default Admin;
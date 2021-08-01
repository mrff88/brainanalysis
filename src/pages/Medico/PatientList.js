const PatientList = ({ patients }) => {
    return (
        <div className="patient-list mt-3 px-3">
            <br />
            <table className="table">
                <thead>
                    <tr className="table-dark text-center">
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.nombres}</td>
                            <td>{patient.apellidos}</td>
                            <td className="text-center">{patient.DNI}</td>
                            <td className="text-center">
                                <div class="icon">
                                    <svg
                                        width="1.5em"
                                        height="1.5em"
                                        viewBox="0 0 16 16"
                                        class="bi bi-pencil-fill"
                                        fill="#084f98"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z"
                                        />
                                    </svg>
                                </div>
                                <div class="icon">
                                    <svg
                                        width="1.5em"
                                        height="1.5em"
                                        viewBox="0 0 16 16"
                                        class="bi bi-eye-fill"
                                        fill="#084f98"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                                        />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientList;
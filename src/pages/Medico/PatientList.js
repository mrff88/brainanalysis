import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTable, useFilters, useGlobalFilter, usePagination, useAsyncDebounce } from 'react-table'

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={count === 1 ? `${count} Paciente...` : `${count} Pacientes...`}
            />
        </span>
    )
}

const PatientList = ({ columns, patients }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setGlobalFilter,
        state,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        preGlobalFilteredRows

    } = useTable(
        {
            columns,
            data: patients,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )

    return (
        <div className="patient-list mt-3 px-3">
            <div className="psearch d-flex flex-row justify-content-between">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <Link to="/medico/agregar_paciente"><button className="btn btn-primary">Agregar Paciente</button></Link>
            </div>
            <div className="plist">
                <table className=" table mt-3" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr className="table-dark text-center" {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="paginacion d-flex flex-row justify-content-center">
                <ul className="pagination">
                    <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <button className="page-link" href="#">Primero</button>
                    </li>
                    <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <button className="page-link" href="#">{'<'}</button>
                    </li>
                    <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                        <button className="page-link" href="#">{'>'}</button>
                    </li>
                    <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <button className="page-link" href="#">Ultimo</button>
                    </li>
                    <li>
                        <button className="page-link" href="#">
                            Pagina{' '}
                            <strong>
                                {pageIndex + 1} de {pageOptions.length}
                            </strong>{' '}
                        </button>
                    </li>
                    <li>
                        <span className="page-link">
                            <input
                                className="form-control"
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '70px', height: '24px' }}
                            />
                        </span>
                    </li>{' '}
                    <select
                        className="form-select"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        style={{ width: '120px', height: '38px' }}
                    >
                        {[5, 10, 20].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Ver {pageSize}
                            </option>
                        ))}
                    </select>
                </ul>
            </div>
        </div>
    );
}

export default PatientList;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from 'react-select';
import DiagnosticModal from "./DiagnosticModal";
import { preguntas } from "../../Preguntas";

const FormDiagnosticar = ({ patients }) => {
    const [modal, setModal] = useState(false);
    const [tempdata, setTempdata] = useState();
    const [misPreguntas, setPreguntas] = useState(preguntas);
    const [validacion, setValidacion] = useState(false);
    const options = patients.map(patient => {
        return { value: patient.id, label: `${patient.nombres} ${patient.apellidos}` }
    });
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect( () => {
        const newPreguntas = JSON.parse(JSON.stringify(preguntas));
        setPreguntas(newPreguntas);
    },[]);

    const encontrarMayor = (dataset) => {
        let max = -Infinity;
        let key = 0;

        dataset.forEach((item, index) => {
            if (max < +item.porcentaje) {
                max = +item.porcentaje;
                key = index;
            }
        });
        return key;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidacion(true);
        if (misPreguntas.filter(item => item.value === null).length === 0 && selectedOption !== null) {
            const resultado = [
                { lobe: 'Parietal', porcentaje: parseFloat((misPreguntas.filter(item => (item.value === 1 && item.lobulo === 'Parietal')).length / 14).toFixed(4)) },
                { lobe: 'Temporal', porcentaje: parseFloat((misPreguntas.filter(item => (item.value === 1 && item.lobulo === 'Temporal')).length / 4).toFixed(4)) },
                { lobe: 'Occipital', porcentaje: parseFloat((misPreguntas.filter(item => (item.value === 1 && item.lobulo === 'Occipital')).length / 7).toFixed(4)) },
                { lobe: 'Frontal', porcentaje: parseFloat((misPreguntas.filter(item => (item.value === 1 && item.lobulo === 'Frontal')).length / 12).toFixed(4)) },
                { lobe: 'Limbico', porcentaje: parseFloat((misPreguntas.filter(item => (item.value === 1 && item.lobulo === 'Limbico')).length / 6).toFixed(4)) },
                { lobe: 'Otras Areas', porcentaje: parseFloat((misPreguntas.filter(item => (item.value === 1 && item.lobulo === 'Otras Areas')).length / 5).toFixed(4)) }
            ];
            console.log(resultado);
            setTempdata({
                patientid: parseInt(selectedOption.value),
                lobe: resultado[encontrarMayor(resultado)].lobe,
                porcentaje: resultado[encontrarMayor(resultado)].porcentaje,
            });
            setModal(true);
        }
    }

    const handleRadio = index => (e) => {
        let newArr = [...misPreguntas];
        newArr[index].value = parseInt(e.target.value);
        setPreguntas(newArr);
    }

    return (
        <div>
            <h2 className="my-3" >Diagnosticar</h2>
            <form className="baform py-3" onSubmit={handleSubmit}>
                <Select
                    placeholder='Seleccione un paciente...'
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                {validacion && selectedOption === null && <div className="alert alert-danger" role="alert">Por favor, seleccione un paciente</div>}
                {misPreguntas.map((pregunta, index) => {
                    return <div className="mb-3" key={index + 1}>
                        <p><strong>{`${index + 1}.- ${pregunta.pregunta}`}</strong></p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                id={`basi${pregunta.id}`}
                                type="radio"
                                value={1}
                                checked={pregunta.value === 1}
                                onChange={handleRadio(index)}
                            />
                            <label className="form-check-label" htmlFor={`basi${pregunta.id}`}>
                                Si
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                id={`bano${pregunta.id}`}
                                type="radio"
                                value={0}
                                checked={pregunta.value === 0}
                                onChange={handleRadio(index)}
                            />
                            <label className="form-check-label" htmlFor={`bano${pregunta.id}`}>
                                No
                            </label>
                        </div>
                        {validacion && pregunta.value === null && <div className="alert alert-danger" role="alert">Por favor, marque una opción</div>}
                    </div>
                })}
                <div className="d-flex flex-row justify-content-between pt-3">
                    <Link to="/medico"><button className="w-100 me-3 btn btn-lg btn-secondary"><strong>Cancelar</strong></button></Link>
                    <button className="w-100 ms-3 btn btn-lg btn-primary"><strong>Analizar</strong></button>
                </div>
            </form>
            {modal ? <DiagnosticModal tempdata={tempdata} hide={() => setModal(false)} /> : null}
        </div>
    );
}

export default FormDiagnosticar;
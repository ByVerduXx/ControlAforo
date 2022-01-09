import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
  } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import useEstadisticas from '../../hooks/useEstadisticas';

import './Estadisticas.css'

function Estadisticas() {

    const history = useHistory();
    const { estadisticas, getEstadisticas, getPositivos, positivosData, positivosLabels, aforoData, aforoLabels, getAforo } = useEstadisticas();

    useEffect(() => {
        if (window.sessionStorage.getItem('user') !== 'admin') {
            history.push('/');
        }
        getEstadisticas();
        getPositivos(false);
        getAforo();
    }, [history, getEstadisticas, getPositivos, getAforo]);

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

    const positivosOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Positivos',
            },
        },
    }

    const positivosChart = {
        labels: positivosLabels,
        datasets: [
            {
                label: 'Positivos',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: positivosData
            },]
    }

    const aforoOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Aforo',
            },
        },
    }

    const aforoChart = {
        labels: aforoLabels,
        datasets: [
            {
                label: 'Aforo',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: aforoData
            },]
    }

    const handleChange = (e) => {
        getPositivos(e.target.value);
    }

    return (
        <div className='estadisticas'>
            <h1 className='estadisticas-title'>Estadísticas</h1>
            <div className='estadisticas-container'>
                <ul className='lista-estadisticas'>
                    <li>Número de usuarios registrados: <strong>{estadisticas.usuarios}</strong></li>
                    <li>Número de oficinas: <strong>{estadisticas.oficinas}</strong></li>
                    <li>Número de positivos totales: <strong>{estadisticas.positivos}</strong></li>
                </ul>
                <div className="charts">
                    <div className='positivos-chart chart'>
                        <h3>Número de positivos</h3>
                        <div className="selector">
                            <select defaultValue={false} onChange={handleChange}>
                                <option value={false}>Este año</option>
                                <option value={true}>Total</option>
                            </select>
                            <span className='custom-arrow'></span>
                        </div>
                        <Bar options={positivosOptions} data={positivosChart} />
                    </div>
                    <div className='otro-chart chart'>
                        <h3>Aforo medio por hora</h3>
                        <div className="selector">
                            <select>
                                <option value="1">Este año</option>
                                <option value="2">Este mes</option>
                            </select>
                            <span className='custom-arrow'></span>
                        </div>
                        <Line options={aforoOptions} data={aforoChart}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Estadisticas

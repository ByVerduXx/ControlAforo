import { useState, useCallback } from "react";
import getEstadisticasGenerales from "../services/getEstadisticasGenerales";
import getEstadisticasPositivos from "../services/getEstadisticasPositivos";
import getAforoHora from "../services/getAforoHora";


export default function useEstadisticas () {
    const [estadisticas, setEstadisticas] = useState({});
    const [positivosData, setPositivosData] = useState([]);
    const [positivosLabels, setPositivosLabels] = useState([]);
    const [aforoData, setAforoData] = useState([]);
    const aforoLabels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];


    const getEstadisticas = useCallback(() => {
        const jwt = window.sessionStorage.getItem('jwt');
        getEstadisticasGenerales(jwt).then(response => {
            setEstadisticas(response[0]);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const getPositivos = useCallback((total) => {
        const jwt = window.sessionStorage.getItem('jwt');
        getEstadisticasPositivos(jwt, total).then(response => {
            setPositivosData([]);
            setPositivosLabels([]);
            let data = []
            let labels = []
            response.forEach(element => {
                data.push(element.positivos);
                labels.push(element.label);
            })
            setPositivosData(data);
            setPositivosLabels(labels);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const getAforo = useCallback(() => {
        const jwt = window.sessionStorage.getItem('jwt');
        let data = new Array(24).fill(0);
        let promises = [];
        for (let i = 0; i < 24; i++) {
            promises.push(getAforoHora(jwt, i));
        }
        Promise.all(promises).then(response => {
            response.forEach(element => {
                data[element.hora] = element.aforo;
            });
            setAforoData(data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return {
        estadisticas,
        getEstadisticas,
        getPositivos,
        positivosData,
        positivosLabels,
        aforoData,
        aforoLabels,
        getAforo
    }
}
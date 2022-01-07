import { useState, useCallback } from "react";
import getEstadisticasGenerales from "../services/getEstadisticasGenerales";
import getEstadisticasPositivos from "../services/getEstadisticasPositivos";

export default function useEstadisticas () {
    const [estadisticas, setEstadisticas] = useState({});
    const [positivosData, setPositivosData] = useState([]);
    const [positivosLabels, setPositivosLabels] = useState([]);


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
            response.forEach(element => {
                setPositivosData(prevState => [...prevState, element.positivos]);
                setPositivosLabels(prevState => [...prevState, element.label]);
            })
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return {
        estadisticas,
        getEstadisticas,
        getPositivos,
        positivosData,
        positivosLabels
    }
}
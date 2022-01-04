import { useState, useCallback } from "react";
import getEstadisticasGenerales from "../services/getEstadisticasGenerales";


export default function useEstadisticas () {
    const [estadisticas, setEstadisticas] = useState({});

    const getEstadisticas = useCallback(() => {
        const jwt = window.sessionStorage.getItem('jwt');
        getEstadisticasGenerales(jwt).then(response => {
            setEstadisticas(response[0]);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return {
        estadisticas,
        getEstadisticas
    }
}
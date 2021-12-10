import { useState, useCallback } from "react";
import getAforo from "../services/getAforo";


export default function useAforo () {
    const [aforo, setAforo] = useState(0);

    const getAforoOficina = useCallback((id_oficina) => {
        getAforo(id_oficina).then(response => {
            setAforo(response.aforo);
        });
    }, []);

    return {
        aforo,
        getAforoOficina,
        setAforo
    }
}
import { useState, useCallback } from "react";
import getAforo from "../services/getAforo";


export default function useAforo () {
    const [aforo, setAforo] = useState(0);

    const getAforoOficina = useCallback((id_oficina) => {
        getAforo(id_oficina).then(response => {
            if (!response) {
                setAforo(0);
            }
            else if (!response.aforo) {
                setAforo(0);
            } else {
                setAforo(response.aforo);
            }
        });
    }, []);

    return {
        aforo,
        getAforoOficina,
        setAforo
    }
}
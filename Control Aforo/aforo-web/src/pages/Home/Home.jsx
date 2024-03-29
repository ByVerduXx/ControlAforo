import React, { useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import mqtt from 'mqtt';
import useAforo from '../../hooks/useAforo';

import getOficinas from '../../services/getOficinas';
import getMaxAforo from '../../services/getMaxAforo';

const options = {
    protocol: 'ws',
    clientId: 'mqttjs_' + Math.random().toString(6),
};

const client = mqtt.connect(`ws://${process.env.REACT_APP_MQTT_URL}:9001`, options);

function Home() {

    const [maxAforo, setMaxAforo] = useState(0);
    const [creciente, setCreciente] = useState(false);
    const [color, setColor] = useState('success');
    const [oficina, setOficina] = useState('1');
    const { aforo, getAforoOficina, setAforo } = useAforo();
    const [listaOficinas, setListaOficinas] = useState([]);

    useEffect(() => {
        document.title = "Control de Aforo";
    }, []);

    useEffect(() => {
        async function getOficina() {
            getOficinas().then(res => {
                if (res) {
                    setListaOficinas(res);
                }
            });
        }
        getOficina();
    }, []);

    useEffect(() => {
        async function getMaxAforoOficina() {
            getMaxAforo(oficina).then(res => {
                if (res) {
                    setMaxAforo(res.aforo);
                }
            });
        }
        getMaxAforoOficina();
    }, [oficina]);

    useEffect(() => {
        getAforoOficina(oficina);
    }, [oficina, getAforoOficina]);

    useEffect(() => {
        client.on('connect', () => {
            client.subscribe('Oficina1/aforo');
        });

        client.on('message', (topic, message) => {
            if (message.toString() === '1') {
                setAforo(a => a + 1);
                setCreciente(true);
            } else if (message.toString() === '-1') {
                setAforo(a => a - 1);
                setCreciente(false);
            }
        });
    }, [setAforo]);

    useEffect(() => {
        const porcentaje = (aforo * 100 / maxAforo)
        if (creciente) {
            if (porcentaje > 50 && porcentaje < 80) {
                setColor('warning')
            } else if (porcentaje > 80) {
                setColor('danger')
            } else {
                setColor('success')
            }
        } else {
            if (porcentaje <= 80 && porcentaje > 50) {
                setColor('warning')
            } else if (porcentaje <= 50) {
                setColor('success')
            } else if (porcentaje > 80) {
                setColor('danger')
            }
        }
    }, [aforo, creciente, maxAforo]);

    const handleChange = (e) => {
        client.unsubscribe(`Oficina${oficina}/aforo`);
        delete client.messageIdToTopic[`Oficina${oficina}/aforo`];
        setOficina(e.target.value);
        client.subscribe(`Oficina${e.target.value}/aforo`);
    }

    return (
        <div className="home">
            <div className="selector-container">
                <div className="selector">
                    <select defaultValue={'1'} onChange={handleChange}>
                        {listaOficinas.map(option => {
                            return <option key={option} value={option}>{`Oficina ${option}`}</option>
                        })}

                    </select>
                    <span className='custom-arrow'></span>
                </div>
            </div>
            <div className="counter-container">
                <p className="counter">{aforo}</p>
            </div>
            <ProgressBar variant={color} animated now={aforo * 100 / maxAforo} />
        </div>
    )
}

export default Home

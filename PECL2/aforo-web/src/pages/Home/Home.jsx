import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import mqtt from 'mqtt';


function Home() {

    const maxAforo = 10;
    const [aforo, setAforo] = useState(0);
    const [creciente, setCreciente] = useState(false);
    const[color, setColor] = useState('success');

    useEffect(() => {
        document.title = "Control de Aforo";
    }, []);

    useEffect(() => {
        const options = {
            protocol: 'ws',
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        };
        
        const client = mqtt.connect('ws://192.168.187.128:9001', options);
        client.on('connect', () => {
            client.subscribe('aforo');
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
    }, []);

    useEffect(() => {
        const porcentaje = (aforo * 100 / maxAforo)
        if (creciente) {
        if (porcentaje > 50 && porcentaje < 80) {
            setColor('warning')
        } else if (porcentaje > 80) {
            setColor('danger')
        }
        } else {
            if (porcentaje <= 80 && porcentaje > 50) {
                setColor('warning')
            } else if (porcentaje <= 50) {
                setColor('success')
            }
        }

    }, [aforo, creciente]);
    
    function handleAddClick() {
        if (aforo === maxAforo) {
            alert('No puede superarse el aforo')
        } else {
            setAforo(aforo + 1);
            const porcentaje = ((aforo + 1) * 100 / maxAforo)
            if (porcentaje > 50 && porcentaje < 80) {
                setColor('warning')
            } else if (porcentaje > 80) {
                setColor('danger')
            }
        }
    }

    function handleSubClick() {

        if (aforo !== 0) {
            setAforo(aforo - 1);
            const porcentaje = ((aforo - 1) * 100 / maxAforo)
            if (porcentaje <= 80 && porcentaje > 50) {
                setColor('warning')
            } else if (porcentaje <= 50) {
                setColor('success')
            }
        }
    }

    return (
        <div className="home">
            <div className="counter-container">
                <p className="counter">{aforo}</p>
            </div>
            <ProgressBar variant={color} animated now={aforo * 100 / maxAforo} />
            <div className="button-container">
                <div className="button">
                    <Button variant="primary" size="lg" onClick={handleAddClick}>Sumar</Button>
                </div>
                <div className="button">
                    <Button variant="danger" size="lg" onClick={handleSubClick}>Restar</Button>
                </div>
            </div>
            
        </div>
    )
}

export default Home

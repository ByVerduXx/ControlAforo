import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';



function Home() {

    const maxAforo = 10;
    const [aforo, setAforo] = useState(0);
    const[color, setColor] = useState('success');

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

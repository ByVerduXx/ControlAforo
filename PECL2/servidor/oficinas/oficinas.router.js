const express = require('express');
const router = express.Router();
const db = require('../database/dbconnection');


router.route('/')
    .get((req, res) => {
        db.getOficinas().then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json(err);
        });
    });
    
router.route('/:id_oficina/aforo_actual')
    .get((req, res) => {
        const id_oficina = req.params.id_oficina;
        db.getActualOfficeCapacity(id_oficina).then(result => {
            res.status(200).json({aforo: result});
        }).catch(err => {
            res.status(500).send(err);
        });
    })

router.route('/:id_oficina/max_aforo')
    .get((req, res) => {
        const id_oficina = req.params.id_oficina;
        db.getMaxAforo(id_oficina).then(result => {
            res.status(200).json({aforo: result});
        }).catch(err => {
            res.status(500).send(err);
        });
    })

exports.router = router;
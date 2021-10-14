/*
    Path: /api/ocupacion
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getOcupaciones, crearOcupacion, eliminarOcupacion } = require('../controllers/ocupacion.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getOcupaciones);
router.post('/', [
        validarJWT,
        check('ocupacion', 'El tipo de ocupacion es necesaria').not().isEmpty(),
        validarCampos,
    ],
    crearOcupacion);

router.delete('/:id', validarJWT, eliminarOcupacion);

module.exports = router;
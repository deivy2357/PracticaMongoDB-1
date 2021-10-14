/*
    Path: /api/evidencia
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEvidencias, crearEvidencias, actualizarEvidencia, eliminarEvidencia } = require('../controllers/evidencia.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getEvidencias);

router.post('/', [
        // Deberia recibir un archivo, solo para prueba se almacenara la ruta
        check('path', 'El nombre del archivo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearEvidencias);

router.put('/:id', [
        validarJWT,
        check('path', 'El nombre del archivo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    actualizarEvidencia);

router.delete('/:id', validarJWT, eliminarEvidencia);

module.exports = router;
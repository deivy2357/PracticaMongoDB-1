/*
    Path: /api/tipo-apoderado
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getParentescos, crearParentesco, eliminarParentesco } = require('../controllers/tipoApoderado.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getParentescos);

router.post('/', [
        validarJWT,
        check('nombreParentesco', 'El nombre del parentesco es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearParentesco);

router.delete('/:id', validarJWT, eliminarParentesco);


module.exports = router;
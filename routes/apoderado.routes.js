/*
    Path: /api/apoderado
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getApoderados, crearApoderado, actualizarApoderado, eliminarApoderado } = require('../controllers/apoderado.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getApoderados);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('uid_parentesco', 'El tipo de parentesco es obligatorio').not().isEmpty(),
        check('uid_ocupacion', 'El tipo de ocupacion es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearApoderado);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        //check('role','El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarApoderado);

router.delete('/:id', validarJWT, eliminarApoderado);


module.exports = router;
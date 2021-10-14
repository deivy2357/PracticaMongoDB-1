/*
    Path: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getFichas, crearFicha, actualizarFicha, eliminarFicha, adjuntarIncidente, obtenerFichas } = require('../controllers/ficha.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getFichas);

router.get('/all', validarJWT, obtenerFichas);

// Crear ficha de matricula
router.post('/', [
        validarJWT,
        check('uid_alumno', 'La secretaria es obligatorio').not().isEmpty(),
        check('uid_apoderado', 'La secretaria es obligatorio').not().isEmpty(),
        check('nivel', 'El nivel es obligatorio').not().isEmpty(),
        check('grado', 'El grado es obligatorio').not().isEmpty(),
        check('seccion', 'La seccion  es obligatoria').not().isEmpty(),
        check('uid_secretaria', 'La secretaria es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearFicha);

// Actualizando ficha
router.put('/:id', [
        validarJWT,
        check('nivel', 'El nivel es obligatorio').not().isEmpty(),
        check('grado', 'El grado es obligatorio').not().isEmpty(),
        check('seccion', 'La seccion  es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    actualizarFicha);

// Eliminando ficha
router.delete('/:id', validarJWT, eliminarFicha);

// Adjuntando incidentes
router.post('/incidentes/:id', [
        validarJWT,
        check('uid_incidente', 'Es obligatorio indicar el inciente').not().isEmpty(),
        validarCampos
    ],
    adjuntarIncidente);





module.exports = router;
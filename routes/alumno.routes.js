/*
    Path: /api/alumno
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getAlumnos, crearAlumno, actualizarAlumno, eliminarAlumno, buscarAlumnos } = require('../controllers/alumno.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getAlumnos);


router.get('/search/:data', validarJWT, buscarAlumnos);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearAlumno);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarAlumno);

router.delete('/:id', validarJWT, eliminarAlumno);


module.exports = router;
/*
    Path: /api/incidente
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getIncidentes, crearIncidente, actualizarIncidente, eliminarIncidente, adjuntarEvidencia } = require('../controllers/incidente.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getIncidentes);

router.post('/', [
        validarJWT,
        check('descripcion', 'El descripcion del incidente es obligatoria').not().isEmpty(),
        check('uid_auxiliar', 'El auxiliar es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearIncidente);

router.post('/evidencia/:uid_incidente', [
    validarJWT,
    check('uid_evidencia', 'Es necesario adjuntar evidencia').not().isEmpty(),
    // check('uid_incidente', 'Es necesario indicar el incidente').not().isEmpty(),
    validarCampos
], adjuntarEvidencia)


router.put('/:id', [
        validarJWT,
        check('descripcion', 'El descripcion del incidente es obligatoria').not().isEmpty(),
        check('auxiliar', 'El auxiliar es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarIncidente);

router.delete('/:id', validarJWT, eliminarIncidente);

module.exports = router;
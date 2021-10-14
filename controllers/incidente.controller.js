const { response } = require('express');
const Incidente = require('../models/incidente.model');
const Evidencia = require('../models/evidencia.model');
const Usuario = require('../models/usuario.model');

const getIncidentes = async(req, res) => {

    const incidentes = await Incidente.find();

    res.json({
        ok: true,
        incidentes
    });
}

const crearIncidente = async(req, res = response) => {

    try {

        const { uid_auxiliar, uid_secretaria } = req.body;

        // Creando incidente
        const incidente = new Incidente(req.body);
        // Buscandp auxiliar 
        const auxiliar = await Usuario.findById(uid_auxiliar);
        const secretaria = await Usuario.findById(uid_secretaria);
        // Buscandp secretaria 
        if (secretaria) {
            incidente.secretaria = secretaria;
            incidente.fecha_justificacion = (new Date).getDate();
        }

        incidente.auxiliar = auxiliar;
        await incidente.save();

        res.json({
            ok: true,
            incidente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}


const adjuntarEvidencia = async(req, res = response) => {


    try {

        const { uid_evidencia } = req.body;
        const { uid_incidente } = req.params;

        const evidencia = await Evidencia.findById(uid_evidencia);
        const incidente = await Incidente.findById(uid_incidente);

        if (!(evidencia && incidente)) {
            res.status(404).json({
                ok: false,
                msg: 'Error al encontrar recursos'
            });
        }

        incidente.evidencias = [...incidente.evidencias, evidencia];

        await incidente.save();

        res.json({
            ok: true,
            incidente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarIncidente = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const incidenteDB = await Incidente.findById(uid);

        if (!incidenteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un incidente con ese id'
            });
        }
        const incidenteActualizado = await Incidente.findByIdAndUpdate(uid, req.body, { new: true });

        res.json({
            ok: true,
            incidente: incidenteActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar incidente'
        });
    }
}

const eliminarIncidente = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const incidenteDB = await Incidente.findById(uid);

        if (!incidenteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un incidente con ese id'
            });
        }
        const incidenteActualizado = await Incidente.findById(uid);
        incidenteActualizado.estado = 0;
        await incidenteActualizado.save();

        res.json({
            ok: true,
            incidente: incidenteActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar incidente'
        });
    }
}


module.exports = {
    getIncidentes,
    crearIncidente,
    adjuntarEvidencia,
    actualizarIncidente,
    eliminarIncidente
}
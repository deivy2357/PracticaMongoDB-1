const { response } = require('express');
const Evidencia = require('../models/evidencia.model');


const getEvidencias = async(req, res) => {

    const evidencias = await Evidencia.find();

    res.json({
        ok: true,
        evidencias
    });
}

const crearEvidencias = async(req, res = response) => {

    try {

        /**
         * Logica para almacenar el archivo .....
         * asignado un nombre al archivo.....
         * registrand nombre del archivo en la DB.....
         */

        const evidencia = new Evidencia(req.body);

        await evidencia.save();

        res.json({
            ok: true,
            evidencia
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarEvidencia = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const evidenciaDB = await Evidencia.findById(uid);

        if (!evidenciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evidencia con ese id'
            });
        }

        const evidenciaActualizada = await Evidencia.findByIdAndUpdate(uid, res.body, { new: true });

        res.json({
            ok: true,
            evidencia: evidenciaActualizada
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar evidencia'
        });
    }
}

const eliminarEvidencia = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const evidenciaDB = await Evidencia.findById(uid);
        if (!evidenciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evidencia con ese id'
            });
        }

        await Evidencia.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Evidencia eliminada de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar evidencia'
        });
    }
}


module.exports = {
    getEvidencias,
    crearEvidencias,
    actualizarEvidencia,
    eliminarEvidencia
}
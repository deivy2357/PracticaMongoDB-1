const { response } = require('express');
const Ocupacion = require('../models/ocupacion.model');


const getOcupaciones = async(req, res) => {
    const ocupaciones = await Ocupacion.find();
    res.json({
        ok: true,
        ocupaciones
    });
}

const crearOcupacion = async(req, res = response) => {
    const { ocupacion } = req.body;
    const nuevaOcupacion = new Ocupacion({
        ocupacion: ocupacion
    });
    await nuevaOcupacion.save();
    res.json({
        ok: true,
        ocupacion
    });
}


const eliminarOcupacion = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const objOcupacion = await Ocupacion.findById(uid);
        if (!objOcupacion) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ninuguna ocupacion con ese id'
            });
        }
        await Ocupacion.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Ocupacion eliminada de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar la ocupacion'
        });
    }
}

module.exports = {
    getOcupaciones,
    crearOcupacion,
    eliminarOcupacion
}
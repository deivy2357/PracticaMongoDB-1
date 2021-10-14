const { response } = require('express');
const TipoApoderado = require('../models/tipoApoderado.model');


const getParentescos = async(req, res) => {
    const parentescos = await TipoApoderado.find();
    res.json({
        ok: true,
        parentescos
    });
}

const crearParentesco = async(req, res = response) => {
    const { nombreParentesco } = req.body;
    const nuevoParentesco = new TipoApoderado({
        nombreParentesco: nombreParentesco
    });
    await nuevoParentesco.save();

    res.json({
        ok: true,
        nuevoParentesco
    });
}

const eliminarParentesco = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const objParentesco = await TipoApoderado.findById(uid);
        if (!objParentesco) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra el parentesco'
            });
        }

        await TipoApoderado.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Parentesco eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar la parentesco'
        });
    }
}

module.exports = {
    getParentescos,
    crearParentesco,
    eliminarParentesco
}
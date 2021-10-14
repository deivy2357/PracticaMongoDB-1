const { response } = require('express');
const bcrypt = require('bcryptjs');
const Apoderado = require('../models/apoderado.model');
const TipoApoderado = require('../models/tipoApoderado.model');
const Ocupacion = require('../models/ocupacion.model');


const getApoderados = async(req, res) => {

    const apoderados = await Apoderado.find();

    res.json({
        ok: true,
        apoderados
    });
}

const crearApoderado = async(req, res = response) => {


    const { nombre, apellidos, dni, uid_parentesco, uid_ocupacion } = req.body;

    try {

        // Obteniendo tipo de ocupacion y parentesco
        const { uid_parentesco, uid_ocupacion, ...campos } = req.body;

        let tParentesco = await TipoApoderado.findOne({ _id: uid_parentesco });
        let tOcupacion = await Ocupacion.findOne({ _id: uid_ocupacion });

        //console.log(tParentesco);
        //console.log(tOcupacion);
        if (!(tParentesco || tOcupacion)) {
            return res.json({
                ok: false,
                msg: 'Error al encontrar parentescos y/o ocupacion'
            });
        }

        const nuevoApoderado = new Apoderado({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            dni: req.body.dni,
            parentesco: tParentesco,
            ocupacion: tOcupacion,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
        });

        await nuevoApoderado.save();

        res.json({
            ok: true,
            nuevoApoderado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarApoderado = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const apoderadoDB = await Apoderado.findById(uid);

        if (!apoderadoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un apoderado con ese id'
            });
        }

        const { dni, ...campos } = req.body;
        if (apoderadoDB.dni !== dni) {
            const existeApoderado = await Apoderado.findOne({ dni });
            if (existeApoderado) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un apoderado con este dni'
                });
            }
        }
        campos.dni = dni;


        const apoderadoActualizado = await Apoderado.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            apoderado: apoderadoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar apoderado'
        });
    }
}

const eliminarApoderado = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const apoderadoDB = await Apoderado.findById(uid);
        if (!apoderadoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro un apoderado con ese id'
            });
        }

        await Apoderado.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Apoderado eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar apoderado'
        });
    }
}

module.exports = {
    getApoderados,
    crearApoderado,
    actualizarApoderado,
    eliminarApoderado
}
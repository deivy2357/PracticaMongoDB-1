const { response } = require('express');
const Ficha = require('../models/ficha.model');
const Alumno = require('../models/alumno.model');
const Apoderado = require('../models/apoderado.model');
const Usuario = require('../models/usuario.model');
const Incidente = require('../models/incidente.model');

const getFichas = async(req, res) => {

    // Para solo mostrar fichas activas, se debe filtar por estado =1
    const fichas = await Ficha.find();

    res.json({
        ok: true,
        fichas
    });
}

const crearFicha = async(req, res = response) => {


    const { uid_alumno, uid_apoderado, uid_secretaria, ...data } = req.body;

    try {

        // Obteniendo objetos referenciados
        const alumno = await Alumno.findById(uid_alumno);
        const apoderado = await Apoderado.findById(uid_apoderado);
        const secretaria = await Usuario.findById(uid_secretaria);

        if (!(alumno || apoderado || secretaria)) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontro los recursos indicados'
            });
        }

        const ficha = new Ficha(data);

        ficha.alumno = alumno;
        ficha.apoderado = apoderado;
        ficha.secretaria = secretaria;

        await ficha.save();
        res.json({
            ok: true,
            ficha
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarFicha = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const fichaDB = await Usuario.findById(uid);

        if (!fichaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe se encuentra la ficha con ese id'
            });
        }

        //actualizacion de datos: solo se actualiazra nivel, grado, seccion
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, req.body, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const adjuntarIncidente = async(req, res = response) => {
    const uid = req.params.id;

    try {
        // Obtenemos ficha y incidentes
        const { uid_incidente } = req.body;

        const ficha = await Ficha.findById(uid);
        const incidente = await Incidente.findById(uid_incidente);

        if (!(ficha || incidente)) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra la ficha y/o incidente con ese id'
            });
        }

        ficha.incidentes = [incidente, ...ficha.incidentes]
        await ficha.save();

        res.json({
            ok: true,
            ficha: ficha
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al adjuntar ficha'
        });
    }
}

const eliminarFicha = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const ficha = await Ficha.findById(uid);
        if (!ficha) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una ficha con ese id'
            });
        }

        ficha.estado = 0;
        await ficha.save();

        res.json({
            ok: true,
            msg: 'Ficha eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar ficha'
        });
    }
}


const obtenerFichas = async(req, res) => {

    busqueda = req.params.data;

    const [fichas, total] = await Promise.all([

        Ficha.find()
        .sort('nivel grado seccion')
        .select(['nivel', 'grado', 'seccion', 'alumno'])
        .where('this.estado==1')
        .skip(0)
        .limit(10),
        Ficha.countDocuments()

    ])

    return res.json({
        ok: true,
        fichas,
        total
    });
}

module.exports = {
    getFichas,
    crearFicha,
    actualizarFicha,
    adjuntarIncidente,
    eliminarFicha,
    obtenerFichas
}
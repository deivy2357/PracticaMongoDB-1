const { response } = require('express');
const Alumno = require('../models/alumno.model');


const getAlumnos = async(req, res) => {

    const alumnos = await Alumno.find();

    res.json({
        ok: true,
        alumnos
    });
}

const buscarAlumnos = async(req, res) => {

    busqueda = req.params.data;

    let alumnos = await Alumno.find({ $or: [{ nombre: busqueda }, { apellidos: busqueda }, { dni: busqueda }] })
        .sort({ nombre: 'asc' })
        .select(['nombre', 'apellidos', 'dni'])
        .where('this.estado!=0');

    return res.json({
        ok: true,
        busqueda,
        alumnos
    });
}

const crearAlumno = async(req, res = response) => {

    //console.log(req.body);
    const { dni } = req.body;

    try {

        const existeAlumno = await Alumno.findOne({ dni });
        if (existeAlumno) {
            return res.status(400).json({
                ok: false,
                msg: 'El alumno ya ha sido registrado'
            });
        }

        const alumno = new Alumno(req.body);
        await alumno.save();

        res.json({
            ok: true,
            alumno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarAlumno = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const alumnoDB = await Alumno.findById(uid);

        if (!alumnoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el alumno con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const { dni, ...campos } = req.body;

        if (alumnoDB.dni !== dni) {
            const existeCodigo = await Alumno.findOne({ dni });
            if (existeCodigo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un alumno con este dni'
                });
            }
        }
        campos.dni = dni;

        //actualizacion de datos
        const alumnoActualizado = await Alumno.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            alumno: alumnoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar alumno'
        });
    }
}

const eliminarAlumno = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const alumnoDB = await Alumno.findById(uid);
        if (!alumnoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un alumno con ese id'
            });
        }

        await Alumno.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Alumno eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar al alumno'
        });
    }
}


module.exports = {
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    buscarAlumnos
}
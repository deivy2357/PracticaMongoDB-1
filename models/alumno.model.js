const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    fecha_nac: Date,
    telefono: String
});

AlumnoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Alumno', AlumnoSchema);
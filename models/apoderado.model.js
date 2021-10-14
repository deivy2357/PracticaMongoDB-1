const { Schema, model } = require('mongoose');

const ApoderadoSchema = Schema({
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
        required: true
    },
    parentesco: {
        type: Schema.Types.ObjectId,
        ref: 'TipoApoderado'
    },
    ocupacion: {
        type: Schema.Types.ObjectId,
        ref: 'Ocupacion'
    },
    direccion: String,
    telefono: String
});

ApoderadoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Apoderado', ApoderadoSchema);
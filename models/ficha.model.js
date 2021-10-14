const { Schema, model } = require('mongoose');

const FichaSchema = Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno'
    },
    apoderado: {
        type: Schema.Types.ObjectId,
        ref: 'Apoderado'
    },
    nivel: {
        type: String,
        required: true
    },
    grado: {
        type: String,
        required: true
    },
    seccion: {
        type: String,
        required: true
    },
    estado: {
        type: Number,
        default: 1
    },
    secretaria: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    incidentes: [{
        type: Schema.Types.ObjectId,
        ref: 'Incidente'
    }],
    create_at: {
        type: Date,
        default: (new Date).getDate()
    },
    update_at: {
        type: Date,
        default: (new Date).getDate()
    }
});

FichaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Ficha', FichaSchema);
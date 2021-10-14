const { Schema, model } = require('mongoose');

const IncidenciaSchema = Schema({
    descripcion: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: (new Date).getDate()
    },
    auxiliar: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    justificacion: String,
    secretaria: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha_justificacion: {
        type: Date,
        default: (new Date).getDate()
    },
    parentesco: {
        type: Schema.Types.ObjectId,
        ref: 'TipoApoderado'
    },
    apoderado: String,
    evidencias: [{
        type: Schema.Types.ObjectId,
        ref: 'Evidencia'
    }],
    estado: {
        type: Number,
        default: 1
    }
});

IncidenciaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Incidente', IncidenciaSchema);
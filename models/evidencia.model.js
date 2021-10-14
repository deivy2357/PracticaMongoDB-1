const { Schema, model } = require('mongoose');

const EvidenciaSchema = Schema({
    path: {
        type: String,
        required: true
    },
    descripcion: String,
    estado: {
        type: Number,
        default: 1
    },
    create_at: {
        type: Date,
        default: (new Date).getDate()
    },
    update_at: {
        type: Date,
        default: (new Date).getDate()
    }
});

EvidenciaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Evidencia', EvidenciaSchema);
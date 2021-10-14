const { Schema, model } = require('mongoose');

const OcupacionSchema = Schema({
    ocupacion: {
        type: String,
        required: true
    }
}, { collection: 'Ocupaciones' });

OcupacionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Ocupacion', OcupacionSchema);
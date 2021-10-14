const { Schema, model } = require('mongoose');

const TipoApoderadoSchema = Schema({
    nombreParentesco: {
        type: String,
        required: true
    }
}, { collection: 'tipoApoderado' });

TipoApoderadoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('TipoApoderado', TipoApoderadoSchema);
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Invitado'
    },
    img: {
        type: String,
        default: 'defauld.jpg'
    },
    google: {
        type: Boolean,
        default: false
    },
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

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UserSchema);
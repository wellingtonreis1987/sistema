var mongoose = require('mongoose');

var schema = mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    grupo: {type: mongoose.Schema.Types.ObjectId, ref: 'Grupos'},
    descricao: {
        type: String
    }
});

mongoose.model('Foto', schema);
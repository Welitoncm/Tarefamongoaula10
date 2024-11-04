const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    RA: String,
    fk_idTurma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina'
    }
});

module.exports = mongoose.model('Aluno', AlunoSchema);

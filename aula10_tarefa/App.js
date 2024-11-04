require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Conexão com o MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/aula10', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(3000, () => {
        console.log("Servidor iniciado na porta 3000");
    });
})
.catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err);
});



// Importação das rotas
const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');

// Uso das rotas
app.use('/alunos', alunoRoutes);
app.use('/disciplinas', disciplinaRoutes);

// Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

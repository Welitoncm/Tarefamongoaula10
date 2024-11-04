const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');

// Rota para listar todos os alunos e as disciplinas relacionadas
router.get('/', async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('fk_idTurma');
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alunos', error });
    }
});

// Rota para obter um aluno específico pelo ID
router.get('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id).populate('fk_idTurma');
        if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar aluno', error });
    }
});

// Rota para criar um novo aluno
router.post('/', async (req, res) => {
    const { nome, idade, RA, fk_idTurma } = req.body;
    const aluno = new Aluno({ nome, idade, RA, fk_idTurma });
    try {
        await aluno.save();
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar aluno', error });
    }
});

// Rota para atualizar um aluno existente
router.patch('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno', error });
    }
});

// Rota para excluir um aluno
router.delete('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id);
        if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir aluno', error });
    }
});

module.exports = router;

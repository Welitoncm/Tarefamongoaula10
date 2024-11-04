const express = require('express');
const router = express.Router();
const Disciplina = require('../models/Disciplina');
const Aluno = require('../models/Aluno');

// Rota para listar todas as disciplinas
router.get('/', async (req, res) => {
    try {
        const disciplinas = await Disciplina.find();
        res.status(200).json(disciplinas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar disciplinas', error });
    }
});

// Rota para obter uma disciplina pelo ID e listar os alunos relacionados
router.get('/:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id);
        const alunos = await Aluno.find({ fk_idTurma: req.params.id });
        if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });
        res.status(200).json({ disciplina, alunos });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar disciplina', error });
    }
});

// Rota para criar uma nova disciplina
router.post('/', async (req, res) => {
    const { nome, cargaHoraria, sala } = req.body;
    const disciplina = new Disciplina({ nome, cargaHoraria, sala });
    try {
        await disciplina.save();
        res.status(201).json(disciplina);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar disciplina', error });
    }
});

// Rota para atualizar uma disciplina existente
router.patch('/:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });
        res.status(200).json(disciplina);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar disciplina', error });
    }
});

// Rota para excluir uma disciplina e os alunos relacionados
router.delete('/:id', async (req, res) => {
    try {
        await Aluno.deleteMany({ fk_idTurma: req.params.id });
        const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
        if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });
        res.status(200).json({ message: 'Disciplina e alunos excluídos com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir disciplina', error });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const HabilidadesController = require('../controllers/habilidadesController');
const { body } = require('express-validator');

// Validações
const validacoes = [
    body('nome')
        .notEmpty().withMessage('Nome da habilidade é obrigatório')
        .isLength({ max: 100 }).withMessage('Nome muito longo'),
    
    body('categoria')
        .notEmpty().withMessage('Categoria é obrigatória')
        .isIn(['Linguagem de Programação', 'Framework Frontend', 'Framework Backend', 'Banco de Dados', 'DevOps', 'Ferramentas', 'Soft Skills', 'Metodologias']).withMessage('Categoria inválida'),
    
    body('nivel')
        .notEmpty().withMessage('Nível é obrigatório')
        .isIn(['Básico', 'Intermediário', 'Avançado', 'Expert']).withMessage('Nível inválido'),
    
    body('anos_experiencia')
        .optional()
        .isInt({ min: 0, max: 50 }).withMessage('Anos de experiência deve ser um número entre 0 e 50'),
    
    body('descricao')
        .optional()
        .isLength({ max: 500 }).withMessage('Descrição muito longa')
];

// Rotas
router.get('/', HabilidadesController.listarTodos);
router.get('/categoria/:categoria', HabilidadesController.buscarPorCategoria);
router.get('/:id', HabilidadesController.buscarPorId);
router.post('/', validacoes, HabilidadesController.criar);
router.put('/:id', validacoes, HabilidadesController.atualizar);
router.delete('/:id', HabilidadesController.excluir);

module.exports = router; 
const express = require('express');
const router = express.Router();
const FormacaoController = require('../controllers/formacaoController');
const { body } = require('express-validator');

// Validações
const validacoes = [
    body('curso')
        .notEmpty().withMessage('Curso é obrigatório')
        .isLength({ max: 100 }).withMessage('Curso muito longo'),
    
    body('instituicao')
        .notEmpty().withMessage('Instituição é obrigatória')
        .isLength({ max: 100 }).withMessage('Instituição muito longa'),
    
    body('tipo_formacao')
        .notEmpty().withMessage('Tipo de formação é obrigatório')
        .isIn(['Bacharelado', 'Licenciatura', 'Técnico', 'Pós-graduação', 'Mestrado', 'Doutorado', 'Curso Livre']).withMessage('Tipo de formação inválido'),
    
    body('data_inicio')
        .notEmpty().withMessage('Data de início é obrigatória')
        .isISO8601().withMessage('Data de início inválida'),
    
    body('data_conclusao')
        .optional()
        .isISO8601().withMessage('Data de conclusão inválida'),
    
    body('em_andamento')
        .optional()
        .isBoolean().withMessage('Em andamento deve ser true ou false'),
    
    body('descricao')
        .optional()
        .isLength({ max: 1000 }).withMessage('Descrição muito longa'),
    
    body('nota_media')
        .optional()
        .isFloat({ min: 0, max: 10 }).withMessage('Nota média deve estar entre 0 e 10')
];

// Rotas
router.get('/', FormacaoController.listarTodos);
router.get('/:id', FormacaoController.buscarPorId);
router.post('/', validacoes, FormacaoController.criar);
router.put('/:id', validacoes, FormacaoController.atualizar);
router.delete('/:id', FormacaoController.excluir);

module.exports = router; 
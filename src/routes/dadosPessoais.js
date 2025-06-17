const express = require('express');
const router = express.Router();
const DadosPessoaisController = require('../controllers/dadosPessoaisController');
const { body } = require('express-validator');

// Validações
const validacoes = [
    body('nome_completo')
        .notEmpty().withMessage('Nome completo é obrigatório')
        .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres'),
    
    body('email')
        .notEmpty().withMessage('Email é obrigatório')
        .isEmail().withMessage('Email inválido'),
    
    body('telefone')
        .optional()
        .matches(/^[0-9\s\-\(\)]+$/).withMessage('Telefone inválido'),
    
    body('endereco')
        .optional()
        .isLength({ max: 500 }).withMessage('Endereço muito longo'),
    
    body('cidade')
        .optional()
        .isLength({ max: 100 }).withMessage('Cidade muito longa'),
    
    body('estado')
        .optional()
        .isLength({ max: 50 }).withMessage('Estado muito longo'),
    
    body('pais')
        .optional()
        .isLength({ max: 50 }).withMessage('País muito longo'),
    
    body('linkedin')
        .optional()
        .isURL().withMessage('LinkedIn deve ser uma URL válida'),
    
    body('github')
        .optional()
        .isURL().withMessage('GitHub deve ser uma URL válida'),
    
    body('portfolio')
        .optional()
        .isURL().withMessage('Portfolio deve ser uma URL válida'),
    
    body('resumo_profissional')
        .optional()
        .isLength({ max: 2000 }).withMessage('Resumo profissional muito longo'),
    
    body('foto_perfil')
        .optional()
        .isURL().withMessage('Foto de perfil deve ser uma URL válida')
];

// Rotas
router.get('/', DadosPessoaisController.listarTodos);
router.get('/:id', DadosPessoaisController.buscarPorId);
router.post('/', validacoes, DadosPessoaisController.criar);
router.put('/:id', validacoes, DadosPessoaisController.atualizar);
router.delete('/:id', DadosPessoaisController.excluir);

module.exports = router; 
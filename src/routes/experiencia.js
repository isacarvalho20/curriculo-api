const express = require('express');
const router = express.Router();
const ExperienciaController = require('../controllers/experienciaController');
const { body } = require('express-validator');

// Validações
const validacoes = [
    body('cargo')
        .notEmpty().withMessage('Cargo é obrigatório')
        .isLength({ max: 100 }).withMessage('Cargo muito longo'),
    
    body('empresa')
        .notEmpty().withMessage('Empresa é obrigatória')
        .isLength({ max: 100 }).withMessage('Empresa muito longa'),
    
    body('data_inicio')
        .notEmpty().withMessage('Data de início é obrigatória')
        .isISO8601().withMessage('Data de início inválida'),
    
    body('data_fim')
        .optional()
        .isISO8601().withMessage('Data de fim inválida'),
    
    body('em_andamento')
        .optional()
        .isBoolean().withMessage('Em andamento deve ser true ou false'),
    
    body('descricao')
        .optional()
        .isLength({ max: 2000 }).withMessage('Descrição muito longa'),
    
    body('responsabilidades')
        .optional()
        .isArray().withMessage('Responsabilidades deve ser um array'),
    
    body('tecnologias')
        .optional()
        .isArray().withMessage('Tecnologias deve ser um array'),
    
    body('local_trabalho')
        .optional()
        .isLength({ max: 100 }).withMessage('Local de trabalho muito longo'),
    
    body('tipo_contrato')
        .optional()
        .isIn(['CLT', 'PJ', 'Freelance', 'Estágio', 'Trainee']).withMessage('Tipo de contrato inválido')
];

// Rotas
router.get('/', ExperienciaController.listarTodos);
router.get('/:id', ExperienciaController.buscarPorId);
router.post('/', validacoes, ExperienciaController.criar);
router.put('/:id', validacoes, ExperienciaController.atualizar);
router.delete('/:id', ExperienciaController.excluir);

module.exports = router; 
const express = require('express');
const router = express.Router();
const ProjetosController = require('../controllers/projetosController');
const { body } = require('express-validator');

// Validações
const validacoes = [
    body('titulo')
        .notEmpty().withMessage('Título é obrigatório')
        .isLength({ max: 100 }).withMessage('Título muito longo'),
    
    body('descricao')
        .optional()
        .isLength({ max: 2000 }).withMessage('Descrição muito longa'),
    
    body('tecnologias')
        .optional()
        .isArray().withMessage('Tecnologias deve ser um array'),
    
    body('link_repositorio')
        .optional()
        .isURL().withMessage('Link do repositório deve ser uma URL válida'),
    
    body('link_demo')
        .optional()
        .isURL().withMessage('Link da demo deve ser uma URL válida'),
    
    body('data_inicio')
        .notEmpty().withMessage('Data de início é obrigatória')
        .isISO8601().withMessage('Data de início inválida'),
    
    body('data_conclusao')
        .optional()
        .isISO8601().withMessage('Data de conclusão inválida'),
    
    body('em_andamento')
        .optional()
        .isBoolean().withMessage('Em andamento deve ser true ou false'),
    
    body('imagem_projeto')
        .optional()
        .isURL().withMessage('Imagem do projeto deve ser uma URL válida')
];

// Rotas
router.get('/', ProjetosController.listarTodos);
router.get('/em-andamento', ProjetosController.buscarEmAndamento);
router.get('/:id', ProjetosController.buscarPorId);
router.post('/', validacoes, ProjetosController.criar);
router.put('/:id', validacoes, ProjetosController.atualizar);
router.delete('/:id', ProjetosController.excluir);

module.exports = router; 
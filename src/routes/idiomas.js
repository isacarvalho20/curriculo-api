const express = require('express');
const router = express.Router();
const IdiomasController = require('../controllers/idiomasController');
const { body } = require('express-validator');

// Validações
const validacoes = [
    body('idioma')
        .notEmpty().withMessage('Idioma é obrigatório')
        .isLength({ max: 50 }).withMessage('Idioma muito longo'),
    body('nivel_leitura')
        .notEmpty().withMessage('Nível de leitura é obrigatório')
        .isIn(['Básico', 'Intermediário', 'Avançado', 'Nativo']).withMessage('Nível de leitura inválido'),
    body('nivel_escrita')
        .notEmpty().withMessage('Nível de escrita é obrigatório')
        .isIn(['Básico', 'Intermediário', 'Avançado', 'Nativo']).withMessage('Nível de escrita inválido'),
    body('nivel_conversacao')
        .notEmpty().withMessage('Nível de conversação é obrigatório')
        .isIn(['Básico', 'Intermediário', 'Avançado', 'Nativo']).withMessage('Nível de conversação inválido'),
    body('certificacao')
        .optional()
        .isLength({ max: 100 }).withMessage('Certificação muito longa')
];

// Rotas
router.get('/', IdiomasController.listarTodos);
router.get('/:id', IdiomasController.buscarPorId);
router.get('/idioma/:idioma', IdiomasController.buscarPorIdioma);
router.post('/', validacoes, IdiomasController.criar);
router.put('/:id', validacoes, IdiomasController.atualizar);
router.delete('/:id', IdiomasController.excluir);

module.exports = router; 
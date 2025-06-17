const express = require('express');
const router = express.Router();
const CertificacoesController = require('../controllers/certificacoesController');
const { body } = require('express-validator');

// Validações
const validacoes = [
    body('nome')
        .notEmpty().withMessage('Nome da certificação é obrigatório')
        .isLength({ max: 100 }).withMessage('Nome muito longo'),
    body('instituicao')
        .notEmpty().withMessage('Instituição é obrigatória')
        .isLength({ max: 100 }).withMessage('Instituição muito longa'),
    body('data_emissao')
        .notEmpty().withMessage('Data de emissão é obrigatória')
        .isISO8601().withMessage('Data de emissão inválida'),
    body('data_expiracao')
        .optional()
        .isISO8601().withMessage('Data de expiração inválida'),
    body('link_certificado')
        .optional()
        .isURL().withMessage('Link do certificado deve ser uma URL válida'),
    body('codigo_certificado')
        .optional()
        .isLength({ max: 100 }).withMessage('Código do certificado muito longo'),
    body('descricao')
        .optional()
        .isLength({ max: 1000 }).withMessage('Descrição muito longa')
];

// Rotas
router.get('/', CertificacoesController.listarTodos);
router.get('/vigentes', CertificacoesController.buscarVigentes);
router.get('/:id', CertificacoesController.buscarPorId);
router.post('/', validacoes, CertificacoesController.criar);
router.put('/:id', validacoes, CertificacoesController.atualizar);
router.delete('/:id', CertificacoesController.excluir);

module.exports = router; 
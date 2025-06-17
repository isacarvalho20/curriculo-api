const Formacao = require('../models/formacao');

class FormacaoController {
    static async listarTodos(req, res) {
        try {
            const resultado = await Formacao.buscarTodos();
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao listar formações:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Formacao.buscarPorId(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Formação não encontrada' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao buscar formação:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async criar(req, res) {
        try {
            const resultado = await Formacao.criar(req.body);
            res.status(201).json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao criar formação:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Formacao.atualizar(id, req.body);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Formação não encontrada' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao atualizar formação:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Formacao.excluir(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Formação não encontrada' });
            }

            res.json({ mensagem: 'Formação excluída com sucesso' });
        } catch (erro) {
            console.error('Erro ao excluir formação:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }
}

module.exports = FormacaoController; 
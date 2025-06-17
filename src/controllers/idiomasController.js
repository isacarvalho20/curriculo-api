const Idiomas = require('../models/idiomas');

class IdiomasController {
    static async listarTodos(req, res) {
        try {
            const resultado = await Idiomas.buscarTodos();
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao listar idiomas:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Idiomas.buscarPorId(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Idioma não encontrado' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao buscar idioma:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorIdioma(req, res) {
        try {
            const { idioma } = req.params;
            const resultado = await Idiomas.buscarPorIdioma(idioma);
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao buscar idioma por nome:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async criar(req, res) {
        try {
            const resultado = await Idiomas.criar(req.body);
            res.status(201).json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao criar idioma:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Idiomas.atualizar(id, req.body);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Idioma não encontrado' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao atualizar idioma:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Idiomas.excluir(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Idioma não encontrado' });
            }

            res.json({ mensagem: 'Idioma excluído com sucesso' });
        } catch (erro) {
            console.error('Erro ao excluir idioma:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }
}

module.exports = IdiomasController; 
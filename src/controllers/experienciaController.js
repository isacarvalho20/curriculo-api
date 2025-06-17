const Experiencia = require('../models/experiencia');

class ExperienciaController {
    static async listarTodos(req, res) {
        try {
            const resultado = await Experiencia.buscarTodos();
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao listar experiências:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Experiencia.buscarPorId(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Experiência não encontrada' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao buscar experiência:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async criar(req, res) {
        try {
            const resultado = await Experiencia.criar(req.body);
            res.status(201).json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao criar experiência:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Experiencia.atualizar(id, req.body);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Experiência não encontrada' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao atualizar experiência:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Experiencia.excluir(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Experiência não encontrada' });
            }

            res.json({ mensagem: 'Experiência excluída com sucesso' });
        } catch (erro) {
            console.error('Erro ao excluir experiência:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }
}

module.exports = ExperienciaController; 
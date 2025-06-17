const Habilidades = require('../models/habilidades');

class HabilidadesController {
    static async listarTodos(req, res) {
        try {
            const resultado = await Habilidades.buscarTodos();
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao listar habilidades:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Habilidades.buscarPorId(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Habilidade não encontrada' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao buscar habilidade:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorCategoria(req, res) {
        try {
            const { categoria } = req.params;
            const resultado = await Habilidades.buscarPorCategoria(categoria);
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao buscar habilidades por categoria:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async criar(req, res) {
        try {
            const resultado = await Habilidades.criar(req.body);
            res.status(201).json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao criar habilidade:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Habilidades.atualizar(id, req.body);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Habilidade não encontrada' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao atualizar habilidade:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Habilidades.excluir(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Habilidade não encontrada' });
            }

            res.json({ mensagem: 'Habilidade excluída com sucesso' });
        } catch (erro) {
            console.error('Erro ao excluir habilidade:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }
}

module.exports = HabilidadesController; 
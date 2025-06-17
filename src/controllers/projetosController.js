const Projetos = require('../models/projetos');

class ProjetosController {
    static async listarTodos(req, res) {
        try {
            const resultado = await Projetos.buscarTodos();
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao listar projetos:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Projetos.buscarPorId(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Projeto não encontrado' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao buscar projeto:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarEmAndamento(req, res) {
        try {
            const resultado = await Projetos.buscarEmAndamento();
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao buscar projetos em andamento:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async criar(req, res) {
        try {
            const resultado = await Projetos.criar(req.body);
            res.status(201).json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao criar projeto:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Projetos.atualizar(id, req.body);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Projeto não encontrado' });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao atualizar projeto:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Projetos.excluir(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensagem: 'Projeto não encontrado' });
            }

            res.json({ mensagem: 'Projeto excluído com sucesso' });
        } catch (erro) {
            console.error('Erro ao excluir projeto:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }
}

module.exports = ProjetosController; 
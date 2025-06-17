const DadosPessoais = require('../models/dadosPessoais');

class DadosPessoaisController {
    static async listarTodos(req, res) {
        try {
            const resultado = await DadosPessoais.buscarTodos();
            res.json(resultado.rows);
        } catch (erro) {
            console.error('Erro ao listar dados pessoais:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await DadosPessoais.buscarPorId(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ 
                    mensagem: 'Dados pessoais não encontrados' 
                });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao buscar dados pessoais:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async criar(req, res) {
        try {
            const resultado = await DadosPessoais.criar(req.body);
            res.status(201).json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao criar dados pessoais:', erro);
            
            if (erro.code === '23505') { // Código de erro de violação de restrição única
                return res.status(400).json({ 
                    erro: 'Email já cadastrado' 
                });
            }

            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await DadosPessoais.atualizar(id, req.body);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ 
                    mensagem: 'Dados pessoais não encontrados' 
                });
            }

            res.json(resultado.rows[0]);
        } catch (erro) {
            console.error('Erro ao atualizar dados pessoais:', erro);
            
            if (erro.code === '23505') {
                return res.status(400).json({ 
                    erro: 'Email já cadastrado' 
                });
            }

            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const resultado = await DadosPessoais.excluir(id);

            if (resultado.rows.length === 0) {
                return res.status(404).json({ 
                    mensagem: 'Dados pessoais não encontrados' 
                });
            }

            res.json({ 
                mensagem: 'Dados pessoais excluídos com sucesso' 
            });
        } catch (erro) {
            console.error('Erro ao excluir dados pessoais:', erro);
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }
}

module.exports = DadosPessoaisController; 
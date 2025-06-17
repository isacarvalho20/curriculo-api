const db = require('../config/database');

class DadosPessoais {
    static async buscarTodos() {
        const query = 'SELECT * FROM dados_pessoais ORDER BY created_at DESC';
        return db.query(query);
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM dados_pessoais WHERE id = $1';
        return db.query(query, [id]);
    }

    static async criar(dados) {
        const {
            nome_completo,
            email,
            telefone,
            endereco,
            cidade,
            estado,
            pais,
            linkedin,
            github,
            portfolio,
            resumo_profissional,
            foto_perfil
        } = dados;

        const query = `
            INSERT INTO dados_pessoais (
                nome_completo, email, telefone, endereco, cidade, estado, pais,
                linkedin, github, portfolio, resumo_profissional, foto_perfil
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *
        `;

        const valores = [
            nome_completo, email, telefone, endereco, cidade, estado, pais,
            linkedin, github, portfolio, resumo_profissional, foto_perfil
        ];

        return db.query(query, valores);
    }

    static async atualizar(id, dados) {
        const {
            nome_completo,
            email,
            telefone,
            endereco,
            cidade,
            estado,
            pais,
            linkedin,
            github,
            portfolio,
            resumo_profissional,
            foto_perfil
        } = dados;

        const query = `
            UPDATE dados_pessoais
            SET 
                nome_completo = $1,
                email = $2,
                telefone = $3,
                endereco = $4,
                cidade = $5,
                estado = $6,
                pais = $7,
                linkedin = $8,
                github = $9,
                portfolio = $10,
                resumo_profissional = $11,
                foto_perfil = $12,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $13
            RETURNING *
        `;

        const valores = [
            nome_completo, email, telefone, endereco, cidade, estado, pais,
            linkedin, github, portfolio, resumo_profissional, foto_perfil, id
        ];

        return db.query(query, valores);
    }

    static async excluir(id) {
        const query = 'DELETE FROM dados_pessoais WHERE id = $1 RETURNING *';
        return db.query(query, [id]);
    }
}

module.exports = DadosPessoais; 
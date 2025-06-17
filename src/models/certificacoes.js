const db = require('../config/database');

class Certificacoes {
    static async buscarTodos() {
        const query = 'SELECT * FROM certificacoes ORDER BY data_emissao DESC';
        return db.query(query);
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM certificacoes WHERE id = $1';
        return db.query(query, [id]);
    }

    static async buscarVigentes() {
        const query = `
            SELECT * FROM certificacoes 
            WHERE data_expiracao IS NULL OR data_expiracao >= CURRENT_DATE 
            ORDER BY data_emissao DESC
        `;
        return db.query(query);
    }

    static async criar(dados) {
        const {
            nome,
            instituicao,
            data_emissao,
            data_expiracao,
            link_certificado,
            codigo_certificado,
            descricao
        } = dados;

        const query = `
            INSERT INTO certificacoes (
                nome, instituicao, data_emissao, data_expiracao,
                link_certificado, codigo_certificado, descricao
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

        const valores = [
            nome, instituicao, data_emissao, data_expiracao,
            link_certificado, codigo_certificado, descricao
        ];

        return db.query(query, valores);
    }

    static async atualizar(id, dados) {
        const {
            nome,
            instituicao,
            data_emissao,
            data_expiracao,
            link_certificado,
            codigo_certificado,
            descricao
        } = dados;

        const query = `
            UPDATE certificacoes
            SET 
                nome = $1,
                instituicao = $2,
                data_emissao = $3,
                data_expiracao = $4,
                link_certificado = $5,
                codigo_certificado = $6,
                descricao = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
            RETURNING *
        `;

        const valores = [
            nome, instituicao, data_emissao, data_expiracao,
            link_certificado, codigo_certificado, descricao, id
        ];

        return db.query(query, valores);
    }

    static async excluir(id) {
        const query = 'DELETE FROM certificacoes WHERE id = $1 RETURNING *';
        return db.query(query, [id]);
    }
}

module.exports = Certificacoes; 
const db = require('../config/database');

class Formacao {
    static async buscarTodos() {
        const query = 'SELECT * FROM formacao ORDER BY data_inicio DESC';
        return db.query(query);
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM formacao WHERE id = $1';
        return db.query(query, [id]);
    }

    static async criar(dados) {
        const {
            curso,
            instituicao,
            tipo_formacao,
            data_inicio,
            data_conclusao,
            em_andamento,
            descricao,
            nota_media
        } = dados;

        const query = `
            INSERT INTO formacao (
                curso, instituicao, tipo_formacao, data_inicio, data_conclusao,
                em_andamento, descricao, nota_media
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;

        const valores = [
            curso, instituicao, tipo_formacao, data_inicio, data_conclusao,
            em_andamento, descricao, nota_media
        ];

        return db.query(query, valores);
    }

    static async atualizar(id, dados) {
        const {
            curso,
            instituicao,
            tipo_formacao,
            data_inicio,
            data_conclusao,
            em_andamento,
            descricao,
            nota_media
        } = dados;

        const query = `
            UPDATE formacao
            SET 
                curso = $1,
                instituicao = $2,
                tipo_formacao = $3,
                data_inicio = $4,
                data_conclusao = $5,
                em_andamento = $6,
                descricao = $7,
                nota_media = $8,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $9
            RETURNING *
        `;

        const valores = [
            curso, instituicao, tipo_formacao, data_inicio, data_conclusao,
            em_andamento, descricao, nota_media, id
        ];

        return db.query(query, valores);
    }

    static async excluir(id) {
        const query = 'DELETE FROM formacao WHERE id = $1 RETURNING *';
        return db.query(query, [id]);
    }
}

module.exports = Formacao; 
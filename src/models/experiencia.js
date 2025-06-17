const db = require('../config/database');

class Experiencia {
    static async buscarTodos() {
        const query = 'SELECT * FROM experiencia ORDER BY data_inicio DESC';
        return db.query(query);
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM experiencia WHERE id = $1';
        return db.query(query, [id]);
    }

    static async criar(dados) {
        const {
            cargo,
            empresa,
            data_inicio,
            data_fim,
            em_andamento,
            descricao,
            responsabilidades,
            tecnologias,
            local_trabalho,
            tipo_contrato
        } = dados;

        const query = `
            INSERT INTO experiencia (
                cargo, empresa, data_inicio, data_fim, em_andamento, descricao,
                responsabilidades, tecnologias, local_trabalho, tipo_contrato
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;

        const valores = [
            cargo, empresa, data_inicio, data_fim, em_andamento, descricao,
            responsabilidades, tecnologias, local_trabalho, tipo_contrato
        ];

        return db.query(query, valores);
    }

    static async atualizar(id, dados) {
        const {
            cargo,
            empresa,
            data_inicio,
            data_fim,
            em_andamento,
            descricao,
            responsabilidades,
            tecnologias,
            local_trabalho,
            tipo_contrato
        } = dados;

        const query = `
            UPDATE experiencia
            SET 
                cargo = $1,
                empresa = $2,
                data_inicio = $3,
                data_fim = $4,
                em_andamento = $5,
                descricao = $6,
                responsabilidades = $7,
                tecnologias = $8,
                local_trabalho = $9,
                tipo_contrato = $10,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $11
            RETURNING *
        `;

        const valores = [
            cargo, empresa, data_inicio, data_fim, em_andamento, descricao,
            responsabilidades, tecnologias, local_trabalho, tipo_contrato, id
        ];

        return db.query(query, valores);
    }

    static async excluir(id) {
        const query = 'DELETE FROM experiencia WHERE id = $1 RETURNING *';
        return db.query(query, [id]);
    }
}

module.exports = Experiencia; 
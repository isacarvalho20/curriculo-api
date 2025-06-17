const db = require('../config/database');

class Habilidades {
    static async buscarTodos() {
        const query = 'SELECT * FROM habilidades ORDER BY categoria, nome';
        return db.query(query);
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM habilidades WHERE id = $1';
        return db.query(query, [id]);
    }

    static async buscarPorCategoria(categoria) {
        const query = 'SELECT * FROM habilidades WHERE categoria = $1 ORDER BY nome';
        return db.query(query, [categoria]);
    }

    static async criar(dados) {
        const {
            nome,
            categoria,
            nivel,
            anos_experiencia,
            descricao
        } = dados;

        const query = `
            INSERT INTO habilidades (
                nome, categoria, nivel, anos_experiencia, descricao
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const valores = [
            nome, categoria, nivel, anos_experiencia, descricao
        ];

        return db.query(query, valores);
    }

    static async atualizar(id, dados) {
        const {
            nome,
            categoria,
            nivel,
            anos_experiencia,
            descricao
        } = dados;

        const query = `
            UPDATE habilidades
            SET 
                nome = $1,
                categoria = $2,
                nivel = $3,
                anos_experiencia = $4,
                descricao = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `;

        const valores = [
            nome, categoria, nivel, anos_experiencia, descricao, id
        ];

        return db.query(query, valores);
    }

    static async excluir(id) {
        const query = 'DELETE FROM habilidades WHERE id = $1 RETURNING *';
        return db.query(query, [id]);
    }
}

module.exports = Habilidades; 
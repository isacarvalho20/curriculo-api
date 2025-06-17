const db = require('../config/database');

class Idiomas {
    static async buscarTodos() {
        const query = 'SELECT * FROM idiomas ORDER BY idioma';
        return db.query(query);
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM idiomas WHERE id = $1';
        return db.query(query, [id]);
    }

    static async buscarPorIdioma(idioma) {
        const query = 'SELECT * FROM idiomas WHERE idioma ILIKE $1';
        return db.query(query, [`%${idioma}%`]);
    }

    static async criar(dados) {
        const {
            idioma,
            nivel_leitura,
            nivel_escrita,
            nivel_conversacao,
            certificacao
        } = dados;

        const query = `
            INSERT INTO idiomas (
                idioma, nivel_leitura, nivel_escrita, nivel_conversacao, certificacao
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const valores = [
            idioma, nivel_leitura, nivel_escrita, nivel_conversacao, certificacao
        ];

        return db.query(query, valores);
    }

    static async atualizar(id, dados) {
        const {
            idioma,
            nivel_leitura,
            nivel_escrita,
            nivel_conversacao,
            certificacao
        } = dados;

        const query = `
            UPDATE idiomas
            SET 
                idioma = $1,
                nivel_leitura = $2,
                nivel_escrita = $3,
                nivel_conversacao = $4,
                certificacao = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `;

        const valores = [
            idioma, nivel_leitura, nivel_escrita, nivel_conversacao, certificacao, id
        ];

        return db.query(query, valores);
    }

    static async excluir(id) {
        const query = 'DELETE FROM idiomas WHERE id = $1 RETURNING *';
        return db.query(query, [id]);
    }
}

module.exports = Idiomas; 
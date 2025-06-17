const db = require('../config/database');

class Projetos {
    static async buscarTodos() {
        const query = 'SELECT * FROM projetos ORDER BY data_inicio DESC';
        return db.query(query);
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM projetos WHERE id = $1';
        return db.query(query, [id]);
    }

    static async buscarEmAndamento() {
        const query = 'SELECT * FROM projetos WHERE em_andamento = true ORDER BY data_inicio DESC';
        return db.query(query);
    }

    static async criar(dados) {
        const {
            titulo,
            descricao,
            tecnologias,
            link_repositorio,
            link_demo,
            data_inicio,
            data_conclusao,
            em_andamento,
            imagem_projeto
        } = dados;

        const query = `
            INSERT INTO projetos (
                titulo, descricao, tecnologias, link_repositorio, link_demo,
                data_inicio, data_conclusao, em_andamento, imagem_projeto
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;

        const valores = [
            titulo, descricao, tecnologias, link_repositorio, link_demo,
            data_inicio, data_conclusao, em_andamento, imagem_projeto
        ];

        return db.query(query, valores);
    }

    static async atualizar(id, dados) {
        const {
            titulo,
            descricao,
            tecnologias,
            link_repositorio,
            link_demo,
            data_inicio,
            data_conclusao,
            em_andamento,
            imagem_projeto
        } = dados;

        const query = `
            UPDATE projetos
            SET 
                titulo = $1,
                descricao = $2,
                tecnologias = $3,
                link_repositorio = $4,
                link_demo = $5,
                data_inicio = $6,
                data_conclusao = $7,
                em_andamento = $8,
                imagem_projeto = $9,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $10
            RETURNING *
        `;

        const valores = [
            titulo, descricao, tecnologias, link_repositorio, link_demo,
            data_inicio, data_conclusao, em_andamento, imagem_projeto, id
        ];

        return db.query(query, valores);
    }

    static async excluir(id) {
        const query = 'DELETE FROM projetos WHERE id = $1 RETURNING *';
        return db.query(query, [id]);
    }
}

module.exports = Projetos; 
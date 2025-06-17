const { pool } = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

const initDatabase = async () => {
    try {
        // Lê o arquivo schema.sql
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSQL = await fs.readFile(schemaPath, 'utf8');

        // Divide o script em comandos individuais
        const commands = schemaSQL
            .split(';')
            .filter(command => command.trim())
            .map(command => command + ';');

        // Executa cada comando separadamente
        for (const command of commands) {
            try {
                await pool.query(command);
            } catch (error) {
                // Ignora erros de tabela já existente
                if (error.code === '42P07') {
                    console.log('Tabela já existe, continuando...');
                    continue;
                }
                // Ignora erros de violação de chave única
                if (error.code === '23505') {
                    console.log('Dados de exemplo já existem, continuando...');
                    continue;
                }
                throw error;
            }
        }
        
        console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error.message);
        throw error;
    }
};

module.exports = { initDatabase }; 
const { Pool } = require('pg');
require('dotenv').config();

// Verifica se todas as variáveis de ambiente necessárias estão definidas
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Variáveis de ambiente faltando:', missingEnvVars.join(', '));
    process.exit(1);
}

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: parseInt(process.env.DB_PORT, 10),
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

const pool = new Pool(dbConfig);

// Teste de conexão
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        client.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
        process.exit(1);
    }
};

// Executa o teste de conexão
testConnection();

pool.on('error', (err) => {
    console.error('Erro inesperado no pool de conexões:', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
}; 
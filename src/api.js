const express = require('express');
const cors = require('cors');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());

// Rota de teste simples
app.get('/', (req, res) => {
    res.json({
        message: 'API funcionando no Vercel!',
        timestamp: new Date().toISOString()
    });
});

// Rota de teste para verificar se está funcionando
app.get('/test', (req, res) => {
    res.json({
        status: 'OK',
        environment: process.env.NODE_ENV || 'development',
        message: 'Teste de conexão bem-sucedido'
    });
});

// Middleware de erro
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: err.message
    });
});

// Handler para o Vercel
module.exports = (req, res) => {
    return app(req, res);
}; 

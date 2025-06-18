const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const dadosPessoaisRoutes = require('./routes/dadosPessoais');
const formacaoRoutes = require('./routes/formacao');
const experienciaRoutes = require('./routes/experiencia');
const habilidadesRoutes = require('./routes/habilidades');
const projetosRoutes = require('./routes/projetos');
const certificacoesRoutes = require('./routes/certificacoes');
const idiomasRoutes = require('./routes/idiomas');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rotas
app.use('/api/dados-pessoais', dadosPessoaisRoutes);
app.use('/api/formacao', formacaoRoutes);
app.use('/api/experiencia', experienciaRoutes);
app.use('/api/habilidades', habilidadesRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/certificacoes', certificacoesRoutes);
app.use('/api/idiomas', idiomasRoutes);

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à API de Currículo',
        version: '1.0.0',
        endpoints: {
            dadosPessoais: '/api/dados-pessoais',
            formacao: '/api/formacao',
            experiencia: '/api/experiencia',
            habilidades: '/api/habilidades',
            projetos: '/api/projetos',
            certificacoes: '/api/certificacoes',
            idiomas: '/api/idiomas'
        }
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
    console.error(err.stack);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app; 

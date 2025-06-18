const app = require('./src/index');
const { initDatabase } = require('./src/db/initDb');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await initDatabase();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
        process.exit(1);
    }
};

startServer(); 

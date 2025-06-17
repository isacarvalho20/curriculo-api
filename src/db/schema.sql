-- Criação das tabelas do banco de dados para API de Currículo

-- Tabela de Dados Pessoais
CREATE TABLE IF NOT EXISTS dados_pessoais (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(50),
    pais VARCHAR(50),
    linkedin VARCHAR(200),
    github VARCHAR(200),
    portfolio VARCHAR(200),
    resumo_profissional TEXT,
    foto_perfil VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Formação Acadêmica
CREATE TABLE IF NOT EXISTS formacao (
    id SERIAL PRIMARY KEY,
    curso VARCHAR(100) NOT NULL,
    instituicao VARCHAR(100) NOT NULL,
    tipo_formacao VARCHAR(50) NOT NULL,
    data_inicio DATE NOT NULL,
    data_conclusao DATE,
    em_andamento BOOLEAN DEFAULT false,
    descricao TEXT,
    nota_media DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Experiência Profissional
CREATE TABLE IF NOT EXISTS experiencia (
    id SERIAL PRIMARY KEY,
    cargo VARCHAR(100) NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    em_andamento BOOLEAN DEFAULT false,
    descricao TEXT,
    responsabilidades TEXT[],
    tecnologias TEXT[],
    local_trabalho VARCHAR(100),
    tipo_contrato VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Habilidades
CREATE TABLE IF NOT EXISTS habilidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    anos_experiencia INTEGER,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Projetos
CREATE TABLE IF NOT EXISTS projetos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    tecnologias TEXT[],
    link_repositorio VARCHAR(200),
    link_demo VARCHAR(200),
    data_inicio DATE NOT NULL,
    data_conclusao DATE,
    em_andamento BOOLEAN DEFAULT false,
    imagem_projeto VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Certificações
CREATE TABLE IF NOT EXISTS certificacoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    instituicao VARCHAR(100) NOT NULL,
    data_emissao DATE NOT NULL,
    data_expiracao DATE,
    link_certificado VARCHAR(200),
    codigo_certificado VARCHAR(100),
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Idiomas
CREATE TABLE IF NOT EXISTS idiomas (
    id SERIAL PRIMARY KEY,
    idioma VARCHAR(50) NOT NULL,
    nivel_leitura VARCHAR(20) NOT NULL,
    nivel_escrita VARCHAR(20) NOT NULL,
    nivel_conversacao VARCHAR(20) NOT NULL,
    certificacao VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados de exemplo para teste

-- Dados Pessoais de exemplo
INSERT INTO dados_pessoais (nome_completo, email, telefone, endereco, cidade, estado, pais, linkedin, github, portfolio, resumo_profissional)
VALUES (
    'Maria Santos',
    'maria.santos@exemplo.com',
    '(11) 98888-7777',
    'Rua das Flores, 123',
    'São Paulo',
    'SP',
    'Brasil',
    'https://linkedin.com/in/mariasantos',
    'https://github.com/mariasantos',
    'https://mariasantos.dev',
    'Desenvolvedora Full Stack com 5 anos de experiência em React, Node.js e PostgreSQL. Apaixonada por criar soluções inovadoras e escaláveis.'
);

-- Formação de exemplo
INSERT INTO formacao (curso, instituicao, tipo_formacao, data_inicio, data_conclusao, em_andamento, descricao, nota_media)
VALUES 
    ('Ciência da Computação', 'Universidade de São Paulo', 'Bacharelado', '2018-01-01', '2022-12-31', false, 'Foco em desenvolvimento de software e inteligência artificial', 8.5),
    ('MBA em Gestão de Projetos', 'FGV', 'Pós-graduação', '2023-01-01', NULL, true, 'Especialização em gestão ágil e liderança de equipes', NULL);

-- Experiência de exemplo
INSERT INTO experiencia (cargo, empresa, data_inicio, data_fim, em_andamento, descricao, responsabilidades, tecnologias, local_trabalho, tipo_contrato)
VALUES 
    ('Desenvolvedora Full Stack Senior', 'Tech Solutions', '2023-01-01', NULL, true, 'Liderança técnica de equipes de desenvolvimento', ARRAY['Liderar equipe de 5 desenvolvedores', 'Arquitetura de sistemas', 'Code review'], ARRAY['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker'], 'São Paulo, SP', 'CLT'),
    ('Desenvolvedora Frontend', 'StartupXYZ', '2021-03-01', '2022-12-31', false, 'Desenvolvimento de interfaces responsivas', ARRAY['Desenvolvimento de componentes React', 'Integração com APIs'], ARRAY['React', 'JavaScript', 'CSS3', 'HTML5'], 'Remoto', 'PJ');

-- Habilidades de exemplo
INSERT INTO habilidades (nome, categoria, nivel, anos_experiencia, descricao)
VALUES 
    ('JavaScript', 'Linguagem de Programação', 'Avançado', 5, 'ES6+, TypeScript, Node.js'),
    ('React', 'Framework Frontend', 'Avançado', 4, 'Hooks, Context API, Redux'),
    ('Node.js', 'Runtime', 'Intermediário', 3, 'Express, APIs RESTful'),
    ('PostgreSQL', 'Banco de Dados', 'Intermediário', 3, 'Queries complexas, otimização'),
    ('Git', 'Controle de Versão', 'Avançado', 5, 'GitHub, GitLab, workflows'),
    ('Docker', 'DevOps', 'Intermediário', 2, 'Containerização, Docker Compose'),
    ('Liderança', 'Soft Skills', 'Intermediário', 2, 'Gestão de equipes, mentoria'),
    ('Comunicação', 'Soft Skills', 'Avançado', 5, 'Apresentações, documentação');

-- Projetos de exemplo
INSERT INTO projetos (titulo, descricao, tecnologias, link_repositorio, link_demo, data_inicio, data_conclusao, em_andamento)
VALUES 
    ('Sistema de Gestão Empresarial', 'Sistema completo de gestão com módulos de RH, financeiro e vendas', ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker'], 'https://github.com/mariasantos/sistema-gestao', 'https://sistema-gestao.demo', '2023-06-01', NULL, true),
    ('E-commerce Responsivo', 'Plataforma de e-commerce com carrinho de compras e pagamentos', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'https://github.com/mariasantos/ecommerce', 'https://ecommerce.demo', '2022-01-01', '2022-12-31', false),
    ('App de Finanças Pessoais', 'Aplicativo para controle de gastos e investimentos', ARRAY['React Native', 'Node.js', 'PostgreSQL'], 'https://github.com/mariasantos/financas-app', 'https://financas-app.demo', '2021-08-01', '2021-12-31', false);

-- Certificações de exemplo
INSERT INTO certificacoes (nome, instituicao, data_emissao, data_expiracao, link_certificado, codigo_certificado, descricao)
VALUES 
    ('AWS Certified Developer', 'Amazon Web Services', '2023-06-15', '2026-06-15', 'https://aws.amazon.com/certification', 'AWS-DEV-123456', 'Certificação em desenvolvimento na nuvem AWS'),
    ('Scrum Master', 'Scrum Alliance', '2022-09-20', '2024-09-20', 'https://scrumalliance.org', 'CSM-789012', 'Certificação em metodologia ágil Scrum'),
    ('React Developer', 'Meta', '2023-03-10', NULL, 'https://meta.com/certification', 'REACT-345678', 'Certificação oficial de desenvolvimento React');

-- Idiomas de exemplo
INSERT INTO idiomas (idioma, nivel_leitura, nivel_escrita, nivel_conversacao, certificacao)
VALUES 
    ('Português', 'Nativo', 'Nativo', 'Nativo', NULL),
    ('Inglês', 'Avançado', 'Intermediário', 'Intermediário', 'TOEFL 95'),
    ('Espanhol', 'Intermediário', 'Básico', 'Básico', NULL); 
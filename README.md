# API de CRUD de Filmes

Projeto criado para a disciplina de Infraestrutura na Nuvem com Aws da faculdade de Bacharelado de Sistemas de Informação.
Nesse projeto foi feito em Typescript uma API com um CRUD (create, read, update e delete) para filmes com um frontend básico seguindo a arquitetura MVC. Foi utilizado o Docker para encapsular a API em um container, enquanto em outro container foi iniciado um banco de dados postgres e usando o compose foi feito uma conexão entre os containers.

## Como usar

Com o docker instalado em um sistema Linux ou usando o Play With Docker execute os comandos:

Clone esse reposítório
```sh
git clone https://github.com/JoseAugustoFS/CRUD_Filmes_API
```

Acesse a pasta do repositório
```sh
cd CRUD_Filmes_API
```

Inicie o docker criando os containers e executando os mesmos em segundo plano
```sh
docker-compose up --build -d
```
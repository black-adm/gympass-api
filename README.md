### Gympass Styles App

<p align="left">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" />
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
</p>
<br>

## Setup do projeto

- Após clonar o projeto, digite na raiz o comando `npm install` para baixar as dependências da aplicação. 

- Para rodar o banco de dados, digite `docker compose up -d` para iniciar o container do postgresql.

- Após seguir todos os passos acima, gere as **migrations** do banco com o comando do prisma `npx prisma migrate dev`.

## Requisitos funcionais

- [ x ] Deve ser possível se cadastrar.

- [ x ] Deve ser possível se autenticar.

- [ x ] Deve ser possível obter o perfil de um usuário logado.

- [ x ] Deve ser possível obter o número de check-ins realizados pelo usuário logado.

- [ x ] Deve ser possível o usuário obter seu histórico de check-ins.

- [  ] Deve ser possível o usuário buscar academias próximas.

- [  ] Deve ser possível o usuário buscar academias pelo nome.

- [ x ] Deve ser possível o usuário realizar check-in em uma academia.

- [  ] Deve ser possível validar o check-in de um usuário.

- [ x ] Deve ser possível cadastrar uma academia.

## Regras de negócio

- [ x ] O usuário não deve poder se cadastrar com um e-mail duplicado.

- [ x ] O usuário não pode fazer 2 check-ins no mesmo dia.

- [ x ] O usuário não pode fazer check-in se não estiver próximo a academia ( 100 metros ).

- [  ] O check-in só pode ser validado até 20 minutos após criado.

- [  ] O check-in só pode ser validado por administradores.

- [  ] A academia só pode ser cadastrada por administradores.

## Requisitos não-funcionais

- [ x ] A senha do usuário precisa estar criptografada.

- [ x ] Os dados da aplicação precisam estar persistidos em um banco POSTGRESQL.

- [ x ] Todas listas de dados precisam estar páginas com 20 itens por página.

- [  ] O usuário deve ser identificado por um token JWT ( Json Web Token ).

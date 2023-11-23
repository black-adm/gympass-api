### Gympass Styles App

## Requisitos funcionais

- [  ] Deve ser possível se cadastrar.
- [  ] Deve ser possível se autenticar.
- [  ] Deve ser possível obter o perfil de um usuário logado.
- [  ] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [  ] Deve ser possível o usuário obter seu histórico de check-ins.
- [  ] Deve ser possível o usuário buscar academias próximas.
- [  ] Deve ser possível o usuário buscar academias pelo nome.
- [  ] Deve ser possível o usuário realizar check-in em uma academia.
- [  ] Deve ser possível validar o check-in de um usuário.
- [  ] Deve ser possível cadastrar uma academia.

## Regras de negócio

- [  ] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [  ] O usuário não pode fazer 2 checl-ins no mesmo dia.
- [  ] O usuário não pode fazer check-in se não estiver próximo a academia ( 100 metros ).
- [  ] O check-in só pode ser validado até 20 minutos após criado.
- [  ] O check-in só pode ser validado por administradores.
- [  ] A academia só pode ser cadastrada por administradores.

## Requisitos não-funcionais

- [  ] A senha do usuário precisa estar criptografada.
- [  ] Os dados da aplicação precisam estar persistidos em um banco POSTGRESQL.
- [  ] Todas listas de dados precisam estar páginas com 20 itens por página.
- [  ] O usuário deve ser identificado por um token JWT ( Json Web Token ).

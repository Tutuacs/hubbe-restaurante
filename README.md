<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run prod
```

## Tecnologias

 [NestJS]: Um framework JavaScript para construção de aplicações web escaláveis e eficientes.
 [PrismaORM]: Um ORM para MongoDB que facilita a interação com o banco de dados.
 [Swagger]: Uma ferramenta para documentação de APIs.
 [MongoDB]: Um banco de dados NoSQL baseado em documentos.
 [Insomnia]: Uma ferramenta de teste de APIs.

## Descrição do Projeto

O projeto foi desenvolvido para um processo seletivo da empresa "Hubbe", o projeto baseava-se em fazer uma API_REST que realizasse reservas de mesa para restaurantes, nesta versão estou
usando PrismaORM juntamente com um banco MongoDB que eu criei em uma conta de gmail feita própriamente para a realização deste projeto, configurei um usuário para o projeto, ao tentar
conectar no mongoCompas com o mesmo login só é possivel ver a DataBase: "HubbeDb", sem ter acesso a suas coleções, um usuário pode alterar o usuario administrador padrão criado ao rodar
o projeto contudo o sistema está pronto para caso isso ocorra, o usuário administrador padrão sempre será:

```bash
$ email: admin@admin.com
$ password: Hubbe123
```

ao logar como administrador todas as rotas são acessiveis, contudo nem todas as ações são realizadas (excluir um usuário sem ser o que está logado, excluir a reserva de outro usuário...), usuários administradores podm receber dados diferentes de usuários normais (ver todas as reservas, incluindo a de outros usuários...).Um token fica Valido por 1Dia.
algumas rotas possuem funcionalidades diferentes, exemplo:

```bash
 POST: reserva/create/:type
 type : " auto | manual "
```

Para criar uma reserva o usuário pode usar o modo automático, desta forma, deve ser informado o numero de pessoas, data da reserva e se o usuário aceita juntar mesas para atender o número de pessoas, caso uma mesa não se encaixe com a descrição é informado que não existem mesas disponíveis no horário selecionado e que o usuário pode terntar efetuar a reserva pelo modo manual, com isso ao acessar a rota:

```bash
  GET: reserva/disponiveis
```

É possivel ver as mesas disponíveis em um determinado horário(dia), o número das messas poderá ser passado na rota manual para após validar os dados efetuar a reserva desejada se possivel.

É possivel usar o Sweagger na rota: http://localhost:3000/Arthur_Silva

O Sweagger não foi configurado de forma mais completa como no Insomnia

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

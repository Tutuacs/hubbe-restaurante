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

## Technologies

 [NestJS](https://github.com/nestjs/nest): A JavaScript framework for building scalable and efficient web applications.

 [PrismaORM](https://github.com/prisma/prisma): An ORM for MongoDB that simplifies database interaction.

 [Swagger](https://github.com/swagger-api/swagger-core) A tool for API documentation.

 [MongoDB](https://github.com/mongodb/mongo) A document-based NoSQL database.

 [Insomnia](https://github.com/Kong/insomnia) An API testing tool.

## Project Description

The project was developed for a selection process at the "Hubbe" company. The project involved creating a REST API for restaurant table reservations. In this version, I am using PrismaORM along with a MongoDB database that I created in a Gmail account specifically for this project. I configured a user for the project, and when trying to connect to MongoDB Compass with the same login, it's only possible to see the "HubbeDb" database without access to its collections. A user can change the default administrative user created when running the project. However, the system is ready in case this happens, and the default administrative user will always be:

```bash
$ email: admin@admin.com
$ password: Hubbe123
```

When logging in as an administrator, all routes are accessible, but not all actions can be performed (Ex: deleting a user who is not the logged-in user, deleting another user's reservation, etc.). Administrator users can receive different data from regular users (Ex: view all reservations, including those of other users). A token remains valid for 1 day.

Some routes have different functionalities. For example:

```bash
 POST: reserva/create/:type
 type : " auto | manual "
```

To create a reservation, the user can use the automatic mode, in which they need to provide the number of people, the reservation date, and whether the user accepts combining tables to accommodate the specified number of people. If a table doesn't match the description, it will be indicated that there are no available tables at the selected time, and the user can try making a reservation manually. In this case, when accessing the route:

```bash
  GET: reserva/disponiveis
```

It is possible to view available tables at a specific time. The table numbers can be passed to the manual route to validate the data and make the desired reservation if possible.

You can use Swagger at the following route: http://localhost:3000/Arthur_Silva.

Swagger is not configured as comprehensively as in Insomnia. The repository contains a file that can be imported into Insomnia, along with its variables: http (default URL), token (Admin Token), and testToken (User Token).

## How to Run

Choose between using Swagger or Insomnia. If you choose Insomnia (RECOMMENDED), import the "HubbeRestaurante_Insomnia.json" file into the project's root folder and create a new collection in Insomnia. Start the application with:

```bash
  $ sudo docker-compose up -d --build
```
After starting the application, a default administrator user will be created unless someone (the previously mentioned administrator user) changes it. Update the token variable (valid for 1 day) in Insomnia by logging in as an administrator. With this token, you can create administrator or customer users using the user/create routes. You can also register as a customer by creating "a new account." An administrator can create, edit tables, view all reservations, and create administrative users. A regular user can delete their reservations, view available tables for a specific time, edit their information, and create reservations. There are custom validations for all fields, explaining cases where the user may have made mistakes.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

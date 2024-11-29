<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# Book Dashboard Backend
This is the backend for the Book Dashboard project, built with NestJS and written in TypeScript. It provides a GraphQL API for managing books with authentication via JWT. It uses SQLite as the database and implements various modules to support book management, authentication, and user management.

Deployed URL: https://book-dashboard-backend.onrender.com

Deployment Platform: Render

## Setup
Clone the repository:

`git clone https://github.com/your-repository/book-dashboard-backend.git`

`cd book-dashboard-backend`

## Install dependencies:

### `npm install`
Set up environment variables (e.g., .env):

`AUTH0_DOMAIN=your-auth0-domain`

`AUTH0_AUDIENCE=your-auth0-audience`

## Start the application in development mode:

### `npm run start:dev`

## Important Modules
### AuthModule (`src/auth/auth.module.ts`)
Purpose: Handles JWT authentication and integrates with the UserModule for user management.

Key components:

PassportModule: Handles authentication logic.

JwtStrategy: Validates JWT tokens using passport-jwt.

JwtAuthGuard: Protects routes by enforcing JWT validation.

### JwtAuthGuard (`src/auth/jwt-auth.guard.ts`)
Purpose: Protects routes from unauthorized access by checking if the JWT token is valid.

Key components:

AuthGuard('jwt'): Uses Passport’s JWT strategy to validate tokens.

getRequest(): Customizes the request extraction to work with GraphQL.

handleRequest(): Throws an error if the user is unauthorized.

### JwtStrategy (`src/auth/jwt.strategy.ts`)

Purpose: Validates the JWT and retrieves user information from the payload.

Key components:

passportJwtSecret: Loads the JWT secret from Auth0's JWKS URI.

validate(): Retrieves user details (like email, name, picture) from the JWT payload and checks if the user exists in the database.

### Book Module (`src/book/book.module.ts`)

Purpose: Manages CRUD operations for books in the database.

Key components:

BookService: Handles business logic for book operations.

BookResolver: Exposes GraphQL queries and mutations for books.

Book: The entity representing the book in the database.


### User Module (`src/user/user.module.ts`)

Purpose: Manages user-related data and authentication with Auth0.

Key components:

UserService: Provides methods to create and find users by Auth0 ID.

User: Represents the user entity in the database, including Auth0 details like auth0Id, email, and roles.

##Running Tests

To run all tests:
### `npm run test`

To run tests in watch mode:
### `npm run test:watch`

To check test coverage:
### `npm run test:cov`

## Dependencies
The following dependencies are used in this project:

NestJS: A framework for building efficient, scalable Node.js server-side applications.

@nestjs/common, @nestjs/core, @nestjs/platform-express

@nestjs/apollo, @nestjs/graphql for GraphQL support

@nestjs/jwt, @nestjs/passport for JWT authentication

@nestjs/typeorm for database integration using TypeORM with SQLite

Passport and JWT: For handling authentication and validation of user credentials.

passport, passport-jwt, jwks-rsa

GraphQL: For building the GraphQL API.

graphql, apollo-server-express

TypeORM: For ORM functionality to interact with the SQLite database.

typeorm, sqlite3
Validation: Ensures proper input validation using class-validator and class-transformer.

## Notes
Ensure Auth0 credentials (AUTH0_DOMAIN, AUTH0_AUDIENCE) are set up correctly in the `.env` file for the JWT strategy to work.

The `JwtAuthGuard` is used to protect `GraphQL` queries and mutations by requiring a valid `JWT token`.

The `BookService` handles all CRUD operations on books, while the `BookResolver` exposes these functionalities via `GraphQL API`.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Blogi

#### Requirements:

    - node

    - yarn or npm

    - mysql db

#### Steps:

    1, Clone the repo and cd in to it.

    2, Run yarn install or npm install.

    3, Change the .env.example to .env and set the environment variables
       inside it to your values.

    4, Run ./node_modules/.bin/sequelize db:migrate to create the tables used in the app

    5, Finally run yarn start to fire-up the app and run yarn test
       to see run the tests, but make sure to open the server first

TIP : Check this [doc] for the routes with the specific methods

[doc]: https://docs.google.com/document/d/12uESAIVjZiW_fkInjprVuBcqFvtuMS_xYh_1HlxrOVc/edit?usp=sharing

### File Structures

- the main server is the index.js file which is the entry point for the application

- the app folder contains the middleware and controllers

- the config folder contains the config for the db. you can set development, testing and production db configs there. the production db config is by default from environment variable

- migrations folder contains the schema for the tables. you can run sequelize db:migrate to run the migrations and sequelize db:migrate:undo

- routes folder contains the express mini apps(Router object)

- test contains the tests for the whole app. run the app before testing and run "yarn test" to test the app

- ".env.example" change the name to ".env" and populate the file with your data

### Dependencies

- Express framework: A modern node framework

- Debug: for logging

- jsonwebtoken: to sign and verify jwts

- sequelize, sequelize-cli and mysql2: to interact with the db

- passport, passport-facebook, passport-google-oauth: for social authentication

- momentJs: for time manipulation

- dotenv: for setting environment variable from .env files

### Dev-dependencies

- chai: a modern assertion library for testing
- mocha: to run tests

- eslint: for linting

- prettier and husky: for formatting code and listing pre-commit hook respectively

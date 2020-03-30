# TouchBase Server Documentation

#### Backend deployed at [Heroku] (https://touch-base-server.herokuapp.com/) <br>

## Getting Started

To get the server running locally:

1. `git clone https://github.com/Touch-Base/TouchBaseServer.git`
2. `npm install`
3. Install PostgreSQL

- If you're on Mac:

4. `createdb touchbase` this creates the development database

- If you're on Windows:

5. a. Open pgadmin  
   b. Create database named `touchbase`

6. Run `npm run res` (which runs `npx knex migrate:latest` and `npx knex seed:run` )

## Available Scripts

- `npm start` to start the local server
- `npm start:dev` to start local server in development environment with nodemon
- `npm test` to run test suite once
- `npm run test:watch` to run test suite in watch mode
- `npm run migrate:latest` a convenient wrapper around knex
- `npm run seed:run` a convenient wrapper around knex
- `npm run migrate:test` runs migrations against the test database


# Endpoints

### User Routes

| Method | Endpoint                | Access Control | Description                                               |
| ------ | ----------------------- | -------------- | --------------------------------------------------------- |
| GET    |  `/api/users/user`      | owner          | Returns the information for a user using their token.     |
| POST   |  `/api/users/register`  | anyone         | Registers a user to the database and provides a token.    |
| POST   |  `/api/users/login`     | anyone         | Logs in a user and provides a token.                      |
| PUT    |  `/api/users/update`    | owner          | Updates a user's information using their token.           |

### Job Routes

| Method | Endpoint                | Access Control | Description                                               |
| ------ | ----------------------- | -------------- | --------------------------------------------------------- |
| GET    |  `/api/jobs/get`        | developer      | Returns all jobs in database.                             |
| GET    |  `/api/jobs/getall`     | owner          | Returns all jobs for a user using their token.            |
| POST   |  `/api/jobs/add`        | owner          | Adds a job to a designated user using their token.        |
| PUT    |  `/api/jobs/update`     | owner          | Updates a job using job ID and user token.                |
| DELETE |  `/api/jobs/delete`     | owner          | Deletes a job using job ID and user token.                |

### Connection Routes

| Method | Endpoint                       | Access Control | Description                                               |
| ------ | -------------------------------| -------------- | --------------------------------------------------------- |
| GET    |  `/api/connections/get`        | developer      | Returns all connections in database.                      |
| GET    |  `/api/connections/getall`     | owner          | Returns all connections for a user using their token.     |
| POST   |  `/api/connections/add`        | owner          | Adds a connection to a designated user using their token. |
| PUT    |  `/api/connections/update`     | owner          | Updates a connection using connection ID and user token.  |
| DELETE |  `/api/connections/delete`     | owner          | Deletes a connection using connection ID and user token.  |

### Event Routes

| Method | Endpoint                  | Access Control | Description                                               |
| ------ | --------------------------| -------------- | --------------------------------------------------------- |
| GET    |  `/api/events/get`        | developer      | Returns all events in database.                           |
| GET    |  `/api/events/getall`     | owner          | Returns all events for a user using their token.          |
| POST   |  `/api/events/add`        | owner          | Adds an event to a designated user using their token.     |
| PUT    |  `/api/events/update`     | owner          | Updates an event using event ID and user token.           |
| DELETE |  `/api/events/delete`     | owner          | Deletes an event using event ID and user token.           |

# Data Model

## User Model

| id | firstname | lastname | password | creationDate | email | age | location | jobsTotal | connectionsTotal | summary | phone |
| -- | --------- | -------- | -------- | ------------ | ----- | --- | -------- | --------- | ---------------- | ------- |
| incremented | REQUIRED string | REQUIRED string | string | date | REQUIRED string | integer | string | integer | integer | text | string |

## Jobs Model

| id | position | company | link | method | appDate | notes | interview | userId |
| -- | --------- | -------- | -------- | ------------ | ----- | --- | -------- | --------- |
| incremented | REQUIRED string | REQUIRED string | string | enum(LinkedIn, Connection, Job Website, Company Site, Other) | string | text | boolean(false default) | integer referencing user id |

## Connections Model

| id | firstname | lastname | title | company | phone | email | notes | userId |
| -- | --------- | -------- | -------- | ------------ | ----- | --- | -------- | --------- |
| incremented | REQUIRED string | REQUIRED string | REQUIRED string | REQUIRED string | string | string | text | integer referencing user id |

## Events Model

| id | name | location | date | description | attended | userId |
| -- | --------- | -------- | -------- | ------------ | ----- | --- |
| incremented | REQUIRED string | REQUIRED string | REQUIRED date | text | boolean(false default) | integer referencing user id |


## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

```
EXPRESS_PORT=1234 // Port number for express server to run on
DB_HOST=localhost // Location of the database
DB_PORT=5432      // Port the database is running on
DB_USER=postgres  // THIS IS YOUR LOCAL DB USER NAME (probably postgres)
DB_PASSWORD=pass  // THIS IS YOUR LOCAL DATABASE/PSQL PASSWORD
DB_NAME=touchbase // THIS IS YOUR LOCAL DATABASE NAME

DB_ENV=development

JWT_SECRET="Your Secret." // you can generate this by using a python shell or add in a temporary secret.
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.


### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

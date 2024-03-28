# Template project

This template project has been created with the intent of speed up the configuration process for an application.
## Stack description

This template consists of these two main parts:
* Backend: Spring Boot
* Frontend: Angular

The frontend section has been packed up with the Backend section, so the project can be run as a bundle.
It has also been integrated with `Docker` with his `maven build integration`. The docker compose file allows for the perfect startup.
The only dependency is an external postgres Database running on the `5432` port.
In my example I have used a docker container with an external network also for the database.

#### Authentication
Both frontend and backend contains the logics to handle full role-based authentication.

### Backend

As I said the framework I used is Spring Boot. The project has been created with the [Spring Initializr](https://start.spring.io/).

#### Configuration
The only configuration needed is to add the desired profiles and customize the properties.
There is already a `local` profile for local development.
The other common properties you could want to change are the `database connection properties`, the `roles to use` and the `default role to use`.
You can also change properties regarding `JWT token management`

### Frontend

The framework used for the frontend is Angular. The project has been created with the Angular CLI.
The frontend components used are by the library [PrimeNG](https://primeng.org/)


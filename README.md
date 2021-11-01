![gitnode](GitNode.png)
<h1>About</h1>
This project gets commits pushed to GitHub repositories within a date range. This is a Node.js based microservice application that provides RESTful end points that handle data requests.

<h1>Architecture</h1>
The architecture for this application is based on best practices for microservices and RESTful APIs design.

<h1>Quick Start</h1>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
* Node.js
* Docker
* Redis
* Jest
### Installing
* Clone repository.
* Run npm install (to get all dependencies).
* Run docker-compose up (to create and start containers).

<h1>Configurations and Setup</h1>

### Full clean build and run (slow)
```
$ docker-compose up --force-recreate  --build --renew-anon-volumes
```

### Running tests
```
$ docker-compose run gitnode npm test
```

### Stopping the application and removing data
```
$ docker-compose down -v
```

<h1>API Calls</h1>

### To access all commits within a date range
```
$ http://localhost:8080/users?start=2018-12-07&end=2020-01-09
```

### To access all commits within a date range
```
$ http://localhost:8080/most-frequent?start=2018-12-07&end=2020-01-09
```

<h1>Errors</h1>
The provided date formats is required to be as ISO8601 (YYYY-MM-DD). Any others formats will generate an internal server error.

<h1>To Do</h1>

* Implement a service for Redis.
* Create views and allow user interactions.
* Write more unit and integration tests.

<h1>License</h1>
Distributed under the MIT License. See "LICENSE" for more information.

<h1>Contact</h1>

Dawood Al-Masslawi - [masslawi@gmail.com](masslawi@gmail)






















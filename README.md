# ImageAnalyzer Application

### Prerequisites
This project used React and Spring Boot 3.2.1.<br>
Material UI library, Cloud Vision and OpenAI gpt-3.5-turbo APIs included

## Project Description
Pictures a uploaded through React application and then evaluated in Spring Boot application<br>
using Cloud Vision labels and OpenAi language model if that image belongs to any of the prohibited categories.<br>
Then response is sent to react application and shown via user interface.

## Available Scripts For React Module

In frontend project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### Requirements
* Language JDK 17

## Run DB with Docker
### Run mysql
```
docker compose up -d backend
```

## Run spring boot application using maven
```
mvn spring-boot:run
```

## Access the application
http://localhost:3000



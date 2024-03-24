# ImageAnalyzer Application

### Prerequisites
This project used React and Spring Boot 3.2.1.<br>
Material UI library, Cloud Vision and OpenAI gpt-3.5-turbo APIs included

## Project Description

Pictures are uploaded via a React application, then analyzed within a Spring Boot application using<br>
Cloud Vision labels and the OpenAI language model to ascertain whether the image falls into any<br>
prohibited categories. Subsequently, the response is sent back to the React application<br>
and presented through the user interface.

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



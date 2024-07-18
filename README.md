## Description
This project is an Angular application designed to fetch data from GitHub's GraphQL API, display the data in a tabular format using AG Grid, and visualize specific aspects of the data using D3.js. It leverages the power of Angular for building robust, scalable web applications, integrates AG Grid for powerful data table features, and uses D3.js for creating dynamic, interactive data visualizations.

## Features
1. <b>Fetch Data from GitHub's GraphQL API:</b> The application retrieves repository data from GitHub using GraphQL, allowing for efficient and flexible querying of GitHub's vast dataset.
   
2. <b>Display Data with AG Grid:</b> The fetched data is displayed in a tabular format using AG Grid, which provides a highly customizable and feature-rich table component for modern web applications.
   
3. <b>Visualize Data with D3.js:</b> The application visualizes aspects of the repository data, such as the number of stars, forks, watchers, etc., using D3.js, a powerful library for producing dynamic, interactive data visualizations in web browsers.

## Prerequisites

Before cloning/forking this project, make sure you have the following tools installed:

1. [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8

2. Node version 18.13.0

3. NPM version 8.19.3

## Installation
1. Clone the repository

   > git clone [https://github.com/Suleman0498/user-app.git](https://github.com/Suleman0498/user-app.git)
   >
   > cd user-app
   >
   > git checkout master

2. Install dependencies

   > npm install

3. Run the application

   > ng serve
   >
   > Navigate to [http://localhost:4200/](http://localhost:4200/) to see the application in action.

## Project Architecture

### Components

* <b>AppComponent: </b> The root component that initializes the data fetching, routing and manages the overall layout of the application.

* <b>UserRepoDetailsComponent: </b> Displays the repository data in a tabular format using AG Grid.

* <b>RepositoriesStarsChartComponent: </b> Visualizes the number of stars in bar chart for each repository using D3.js.

### Models

* <b>UserModel: </b> Model file is used to export interfaces, functions and constants for overall application.

### Services

* <b>UserService: </b> Service file is used to call GraphQL query api using Apollo Angular

### Store

* <b>UserStore: </b> Store is build using NgRX SignalStore. This store is used to pass data from root component to sub components

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

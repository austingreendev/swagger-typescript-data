# Swagger Typescript Data

Automated API type enforcement with Angular, TypeScript, and Swagger OpenAPI specification

## Introduction

This repository contains a demonstration of automatically generating API client libraries from Swagger (OpenAPI) configurations for use in Angular + TypeScript codebases.

The key benifits of this approach are:
- Model enforcement between your backend and frontend
    - The models returned from your backend are able to be consumed directly in the frontend.
    - Example: Backend changes the name of a property returned from an endpoint and your frontend build will fail during compilation if the old property is being used (no end-to-end tests necessary).
- Auotmated creation of your API client libraries
    - `swagger-codegen` is able to automatically generate the client side libraries needed to access your backend.
    - If one of the pre-made configurations don't match your needs, you are able to create customized templates for the creation process.
    - Example: The API client libraries are created during every frontend build and not put into source control. If the backend has modified an existing route frontend will continue to build.  If the backend removes an entire operation that the frontend is using, the build will fail.
- Other Swagger goodies
    - Automated documentation
    - 20+ automated client library templates available
        - Ruby, C#, JavaScript, Node.js, etc.

*TL;DR: By automatically creating your backend models and API client libraries using Swagger, you can ensure that your frontend is in-sync with your backend while allowing both teams to work in parallel.  All without end-to-end testing.*

## Repo Breakdown

This repository contains 2 applications:
- Angular 4 frontend
- Express API example backend

### Angular 4 Application

- Created using `@angular/cli` with the yarn package manager option
- The `@angular/cli` proxy settings are configured to allow CORS requests to the local express server
- Modified `package.json` to use `swagger-codegen` during builds
- `.gitignore` modified to not include auto-generated swagger client
- Imports the auto-generate swagger service as a global provider

### Example Express API

- Serves 2 basic endpoints:
    - `/api/pet?limit=[OPTIONAL]` - Return a list of pets
    - `/api/pet/:petId` - Return the details of a specific pet

### Other Swagger Goodies

- Running `npm run documentation` will auto-generate and serve a set of documentation based on the local swagger config

## Walkthrough

### Installation
```
# Clone Repository
git clone https://github.com/austin94/swagger-typescript-data.git
cd swagger-typescript-data

# Install required packages (yarn package manager required)
yarn install

# Install swagger-codegen
brew install swagger-codegen
```
*IMPORTANT: the `package.json` in this demo uses a locally built version of swagger-codgen.  Please change any usage of*
```
java -jar ~/Repos/swagger-codegen/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar
```
to
```
swagger-codegen
```

### Start Express API
```
npm run example-data
```
A sample JSON response would be: `http://localhost:3500/api/pet/5`
```
{
  "id": "5",
  "name": "Pet Name 5",
  "createdAt": "2017-05-21T20:45:25.427Z",
  "description": "This is a really long description...",
  "age": "5",
  "weight": 13.2,
  "type": "DetailedPet"
}
```

### Start Angular 4 application
```
npm start
```
This command does several things:
1. Cleans previous `swagger-codegen` auto-generated files
2. Tells the `swagger-codegen` utility to consume the local swagger configuration at `server/swagger.json` and auto-generate a client library with their `typescript-angular2` template and output this to `src/swagger-data`.
    - This auto-generated template includes an angular `@injectable` service and all of the models (including inheritance) that is defined within your schema.
3. Starts the angular application in development mode using the angular cli

## Use Cases
### Frontend
As a frontend developer I am able to ensure that my application consumes existing endpoints and accurate data models without dedicated end-to-end tests.  Additionally, I don't have to worry about creating/updating any models manually as the schema evolves.

## Backend
As a backend developer I am able to confidentally make changes to existing endpoints and models knowing that if the frontend build passes, the change is safe.

## Other
With Swagger and `swagger-codegen` it is trivial to use their existing or custom templates to create 3rd party client side libraries and documentation.
# Marvel Web Challenge

This repository contains the code for the Marvel Web Challenge. It is a web application that consumes data from the Marvel API and displays information about different characters.

## File distribution and hexagonal architecture

The project follows a hexagonal architecture, which means that the business logic is separated from the external dependencies. This allows for better maintainability and testability.

The project is structured as follows:

- `src/domain`: This folder contains the domain entities, use cases, and repositories. It is the core of the application and contains the business logic.
- `src/infrastructure/repositories`: This folder contains the implementations of the repositories defined in the domain layer. It is responsible for interacting with external systems and data sources.
- `src/infrastructure/controllers`: This folder contains the controllers, which are responsible for handling HTTP requests and responses.
- `src/infrastructure/views`: This folder contains the frontend application. It is built using React with TypeScript and Vite.

The hexagonal architecture allows for better separation of concerns and makes it easier to test and maintain the code.

It's important to note that the backend and frontend are coupled through the API, but they are not directly dependent on each other. This allows for better flexibility and scalability.

## Prerequisites

- Node.js installed: https://nodejs.org/en/download/
- Git installed: https://git-scm.com/downloads
- npm (v6.x or higher)
- pnpm installed: `npm install -g pnpm`

## Installation

1. Clone the repository: `git clone https://github.com/tonyl/marvel.git`
2. Install dependencies: `pnpm install`

## Marvel's API

1. **Create an Account on the Marvel Portal**

   - Visit the [Marvel Developer Portal](https://developer.marvel.com/).
   - Sign up or log in if you already have an account.

2. **Obtain API Keys**

   - After logging in, navigate to the API Keys section.
   - Create a new public and private key if you don't already have one.
   - Copy your public and private key.

3. **Set Up the Development Environment**

   - Create a `.env.development` file in the root of your Node.js project. `./app`
   - Create a `.env.development` file in the root of your frontend project. `./app/src/infrastructure/views/react/marvel-web-app`
   - Create an extra file for build command `.env.production.local` in frontend project with the API_KEY for prod (can be the same as `.env.development` just for dev purposes).

### Example of `.env.development` for the Node.js Project

```env
# .env.development
MARVEL_PUBLIC_KEY=your_public_key
MARVEL_PRIVATE_KEY=your_private_key
PORT=3000
```

### Example of `.env.development` for the React Project

```env
# .env.development
//VITE_API_HOST=localhost:3000
VITE_API_HOST=your_backend_host
```

## Backend

The backend is built using Node.js and Express. It provides a RESTful API for retrieving character and comic information.

### API Routes

- `GET /api/characters`: Get all Marvel characters.
- `GET /api/characters/:characterId`: Get a specific Marvel character by ID.
- `GET /api/characters/:characterId/comics`: Get all comics featuring a specific character by ID.

### Running the backend

1. Start the backend: `cd ./app && npm run dev`

## Frontend

The frontend is built using React with TypeScript and Vite. It consumes data from the backend and displays information about different characters.

### Installation

1. Navigate to the frontend directory: `cd ./src/infrastructure/views/react/marvel-web-app`
   > **Note:** You don't need to run this command if you have already run `pnpm install` in the root folder.
2. Install dependencies: `npm install`

### Running the frontend

1. Start the frontend: `npm run dev`
2. Open your browser and navigate to `http://localhost:3000`

### Building the application

To build the application, you can use the following commands inside the `./app` folder:

- Build app: `pnpm run build`
- Build only frontend: `pnpm run build:frontend`
- Build only backend: `pnpm run build:backend`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

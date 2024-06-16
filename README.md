# Marvel Web Challenge

This repository contains the code for the Marvel Web Challenge. It is a web application that consumes data from the Marvel API and displays information about different characters.

## Prerequisites

- Node.js installed: https://nodejs.org/en/download/
- Git installed: https://git-scm.com/downloads
- pnpm installed: `npm install -g pnpm`

## Backend

The backend is built using Node.js and Express. It provides a RESTful API for retrieving character and comic information.

### Installation

1. Clone the repository: `git clone https://github.com/tonyl/marvel.git`
2. Install dependencies: `pnpm install`

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

# The Photo Album

The Photo Album is a web application built with React, TypeScript, and Vite. It follows a clean architecture approach to ensure maintainability and scalability.

## Structure

WIP

## Features

- Display a list of photo albums.
- View photos within a selected album.

## Getting Started

### Prerequisites

- Node.js (version specified in `package.json` under `volta.node`)
- npm (version specified in `package.json` under `volta.npm`)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/drumnistnakano/react-clean-architecture-sample
```

2. Install dependencies:

```sh
npm install
```

### Running the Application

#### Web Server

To start the development web server:

```sh
npm run serve -w photo-album
```

This will start the Vite development server and you can view the application at `http://localhost:3000`.

#### CLI

To run the CLI for fetching data:

```sh
npm run cli -w photo-album
```

You will be prompted to select a task to execute, such as fetching all albums or fetching photos by album ID.

### Running Tests

To run the tests:

```sh
npm run test -w photo-album
```

### Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vanilla Extract](https://vanilla-extract.style/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

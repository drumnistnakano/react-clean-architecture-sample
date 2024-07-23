# The Photo Album

The Photo Album is a web application built with React, TypeScript, and Vite. It follows a clean architecture approach to ensure maintainability and scalability.


<img src="https://github.com/user-attachments/assets/ceac048e-2af3-40de-b8c9-a883ad8b05e2" width="40%" />

<img src="https://github.com/user-attachments/assets/560c079b-c4ca-47ff-bbe5-e9434a100ee6" width="40%" />

## Structure

![clean-architecture-structure](https://github.com/user-attachments/assets/9ee56dc6-79d8-4e5a-bc21-4fadf6e53428)

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
git clone https://github.com/drumnistnakano/react-clean-architecture-sample.git
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

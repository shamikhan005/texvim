# texvim

texvim is a scalable chat app foundation. unlike typical chat applications, where messages are emitted directly on the server, texvim uses redis to emit messages and then distribute them to multiple servers, ensuring that users on different servers receive messages seamlessly. from redis the message is sent to kafka for stream processing, stored in postgresql, and consumed by node.js.


![Screenshot 2024-10-06 191920](https://github.com/user-attachments/assets/c5ad2239-28d9-4211-8a1f-24e8ef7d94e8)

## tech stack

- **turborepo**: a monorepo for managing multiple projects efficiently.
- **tailwind CSS**: utility-first CSS framework for styling the application.
- **typescript**: a strongly-typed superset of javascript for better code quality.
- **redis**: for handling real-time message distribution.
- **kafka**: for streaming and managing large-scale data pipelines.
- **postgreSQL**: a relational database for storing messages.
- **node.js**: used for consuming Kafka messages and managing server operations.

### package manager 

- **yarn**: a fast, reliable, and secure dependency management tool.

## installation

you can fork this repo by clicking the fork button in the top right corner of the page.

#### clone repository:

```bash
git clone https://github.com/shamikhan005/texvim.git
cd texvim
```

#### install dependencies:

```bash
yarn install
```

#### set up environment variables:

- create a `.env` file in the root directory of the project.
- add the required environment variables such as Redis URL, Kafka broker details, and PostgreSQL connection details.

#### start the development server:

```bash
yarn dev
```

## usage 

after starting the development server, you can interact with that chat application:
- open `http://localhost:3000` in your browser.
- send a message and observe the real-time message handling across different servers





   

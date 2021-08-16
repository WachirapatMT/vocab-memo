# VocabMemo

VocabMemo is a web application which let users build their own vocabulary sets and learn the vocabularies using flash cards and quizzes.

# Demo

Click [here](https://youtu.be/UTB-abBPxaE) or on the image to redirect to the demo video
[![VocabMemo Demo](https://img.youtube.com/vi/UTB-abBPxaE/0.jpg)](https://youtu.be/UTB-abBPxaE)

# Technologies & Frameworks

- Frontend
  - [ReactJS](https://reactjs.org/)
  - [Bootstrap](https://getbootstrap.com/)
  - [Styled Components](https://styled-components.com/)
- Backend
  - [ExpressJS](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [Docker](https://www.docker.com/)

# Getting Started

## Prerequisites

This project requires `docker` and `docker-compose` to run the backend

## Installation

1. Clone the repo
   ```
   $ git clone https://github.com/WachirapatMT/vocab-memo.git
   $ cd vocab-memo
   ```
2. From the root directory, go to frontend directory, install dependencies and build the react app. If you are using command prompt, you will have to manually copy the `build` folder from `./frontend` to `./backend`
   ```
   $ cd frontend
   $ yarn install
   $ yarn build:ui   // for terminal
   $ yarn build      // for command prompt
   ```
3. From the root directory, go to backend directory and run the app

   ```
   $ cd backend
   $ yarn up
   ```

4. The web application is running at http://localhost:3001

**Notes:** There is a default user (username: `user` & password: `password`) which can be used to log in to the web application without sign up.

# Inspirations

- [Quizlets](https://quizlet.com/)
- [Memrise](https://www.memrise.com/)

# Author

- [**Wachirapat Manorat**](www.linkedin.com/in/wachirapat-manorat)

## Fullstack ProductsCatalog Application

This is a fullstack **Product Catalog** web application built with a Typescript/React frontend and a backend using Node.js.  
It allows users to register/login, browse products, view detailed information, read and add/update/delete reviews, and interact through a responsive and user-friendly interface.


## Features

- Register/Login options
- Product listing with images, rating and description
- Add/update/remove product reviews
- Responsive UI with modals, loaders, and form validations
- RESTful API integration using RTK Query (frontend)
- Data persistence with MongoDB

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- Node.js 
- JavaScript/TypeScript support
- Visual Studio Code
- MongoDB Compass  running on localhost:27017
- Git for version control

## Installing instructions

1. Clone the repository
2. Make sure you have all the neccassary 
3. Install dependencies for both frontend and backend:
   - inside the repo main folder, open cmd and run:
        - cd client
        - npm install
        - cd ../server
        - npm install
4. create a new connection to the mongoDB compass on localhost:27017, than create a new Database named ProductsCatalog,
   then import the three included collection that can be found in the repo main folder /MongoCollections


## Running the Project
- inside the repo main folder, open cmd and run:
    - cd client
    - npm run dev
    - cd ../server
    - npm start


After running, the site will open automatically in your browser.
If it doesn't, you can manually visit:
http://localhost:5173/register
- you can use my default user that is already registered:
   - username: oryory2
   - password: abcdefg
- or you can add a new user :)








     

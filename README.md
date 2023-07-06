# lens-ease-fullstack
This is a full-stack web application built with Node.js, React, Redux, and MongoDB.
The project is designed to calculate the price options for glasses lenses based on a user's prescription.

## Features

- User registration and login functionality.
- Input prescription details and receive lens options based on the database.
- Favorite lens options for future reference.
- CRUD operations for admin user.
- Logout functionality.

## Technologies Used

- Server-side:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - bcryptjs for password hashing
  - CORS for cross-origin resource sharing
  - dotenv for environment variables
  - Joi for data validation

- Client-side:
  - React
  - Redux for state management
  - React Router for routing
  - Axios for HTTP requests
  - Formik and Yup for form validation
  - React-Bootstrap for UI components
  - React Icons for icons
  - Lottie for animations
  - React Toastify for notifications

## Installation
- 1.Install server dependencies.
  - cd server
  - npm install
- 2.Set up environment variables.
  - Create a .env file in the server root directory and provide the following variable:
  - MONGODB_URI=(provided in the pdf file)
- 3.Start the server.
  - npm run tsw
  - open a second terminal for:
  - npm run dev
- 4.Install client dependencies.
  - cd ../client
  - npm install
- 5.Start the client.
  - npm start

## For more information please contact me by email:
leamor96@gmail.com









# Backend API for Multi-Factor Authentication (MFA) Login System

This project provides a backend API for the Multi-Factor Authentication (MFA) login system using OTP (One-Time Password) sent via email. This API is used by the AngularJS frontend (version 1.x) in the project [fe-test-eranin](https://github.com/sontiktok/fe-test-eranin).

## Table of Contents

- [Introduction](#introduction)
- [Main Features](#main-features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)

## Introduction

This project builds a backend API for user authentication with Multi-Factor Authentication (MFA) functionality by sending an OTP via email. It includes login, OTP sending, and OTP validation features to ensure user security.

## Main Features

- **Send OTP via email**: Users request an OTP via email before logging in.
- **Login**: Authenticate users' email, password, and OTP.
- **Token management**: Tokens (both Access and Refresh Tokens) are stored in the database and can be revoked when necessary.
- **Revoke tokens**: Tokens can be revoked (e.g., when users log out or refresh) to prevent reuse.
- **Refresh tokens**: When the Access Token expires, users can receive a new token by sending a valid Refresh Token.

## System Requirements

- **Node.js** version **10.24.1**
- **NPM** (Node Package Manager)
- **MySQL** (or a similar database)

## Installation

1. **Clone** this repository to your machine:

   ```bash
   git clone https://github.com/sontiktok/test-eranin
   ```

2. **Navigate** to the project directory:

   ```bash
   cd test-eranin
   ```

3. **Install** the necessary dependencies:

   ```bash
   npm install
   ```

## Configuration

1. **Create a configuration file** `.env` in the root directory of the project and add the necessary environment variables:

   ```env
    PORT=3000

    DB_NAME=test_eranin
    DB_USER=root
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=3306

    REFRESH_SECRET=your_refresh_secret
    JWT_SECRET=your_jwt_secret

    EXPIRE_IN_REFRESH_TOKEN=7d
    EXPIRE_IN_ACCESS_TOKEN=60s

    EMAIL_USERNAME=your_email@example.com
    EMAIL_PASSWORD=your_email_password
   ```

   _Note_: Replace the above values with your actual information.

## Running the Application

To start the application, run the following command:

```bash
npm start
```

## Technologies Used

- **Node.js v10.24.1**

- **Express.js**  
  Web framework for Node.js.

- **MySQL**  
  Relational database.

- **Sequelize**  
  ORM (Object-Relational Mapping) for MySQL in a Node.js environment.

- **Nodemailer**  
  Library for sending emails with Node.js.

- **JSON Web Tokens (JWT)**  
  Open standard for securely transmitting information as a JSON object.

- **Bcrypt**  
  Library for password hashing to ensure user information security.

- **Dotenv**  
  Manages environment variables for the application.

- **Body-parser**  
  Middleware to parse HTTP requests.

- **Cors**  
  Enables Cross-Origin Resource Sharing (CORS) between different origins.

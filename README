# Backend - TypeScript, Node.js, MongoDB, and Passport.js

## Overview

This backend is built using TypeScript and Node.js with Express.js as the web framework. It uses MongoDB as the database and Passport.js for authentication. The application follows a modular structure with a clear separation of concerns.

## Technologies Used

- Node.js - Server-side runtime
- TypeScript - Statically typed JavaScript
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - ODM for MongoDB
- Passport.js - Authentication middleware
- JWT - JSON Web Token for authentication
- dotenv - For environment variable management
- nodemon - For automatic server restarts during development

## Project Structure

```
backend/
│── node_modules/         # Installed dependencies
│── src/
│   ├── @types/           # TypeScript type definitions
│   ├── config/           # Configuration files (DB, Passport, etc.)
│   ├── controllers/      # Request handlers
│   ├── enums/            # Enumerations for constants
│   ├── middlewares/      # Express middlewares (Auth, Error Handling)
│   ├── models/           # Mongoose models (Schemas)
│   ├── routes/           # Express route handlers
│   ├── seeders/          # Scripts to seed the database
│   ├── services/         # Business logic & helper functions
│   ├── utils/            # Utility functions (helpers, logger, etc.)
│   ├── validation/       # Request validation logic
│   ├── index.ts          # Main entry point of the server
│
├── .env                  # Environment variables
├── .gitignore            # Files to ignore in Git
├── .prettierrc           # Prettier formatting configuration
├── .prettierignore       # Ignore files for Prettier
├── nodemon.json          # Nodemon configuration
├── package.json          # Dependencies and scripts
├── package-lock.json     # Exact dependency versions
├── README.md             # Project documentation
├── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### Authentication Routes

- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login
- GET /api/auth/logout - User logout
- GET /api/auth/profile - Get logged-in user profile (Protected)

User Routes

- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

# Front End

## Overview

This project is a frontend application built using React, TypeScript, and Vite. It follows a modular architecture with structured directories to maintain scalability and maintainability.

```
frontend/
│-- .vscode/               # VS Code workspace settings
│-- node_modules/          # Installed dependencies
│-- public/                # Static assets like favicon, manifest, etc.
│-- src/                   # Main source code directory
│   │-- assets/            # Images, icons, and other static resources
│   │-- components/        # Reusable UI components
│   │-- constant/          # Constants and configuration values
│   │-- context/           # React Context API for state management
│   │-- hoc/               # Higher-order components (HOCs)
│   │-- hooks/             # Custom React hooks
│   │-- layout/            # Layout components (e.g., Header, Footer)
│   │-- lib/               # Utility libraries and helpers
│   │-- page/              # Page-level components (e.g., Home, Dashboard)
│   │-- routes/            # React Router configuration
│   │-- store/             # Redux store (if applicable)
│   │-- types/             # TypeScript type definitions
│   │-- App.tsx            # Main App component
│   │-- index.css          # Global styles
│   │-- main.tsx           # Application entry point
│   │-- vite-env.d.ts      # Vite environment type definitions
│-- .env                   # Environment variables
│-- .env.example           # Example environment file
│-- .gitignore             # Files and folders to ignore in Git
│-- components.json        # JSON file for component configuration
│-- eslint.config.js       # ESLint configuration
│-- index.html             # Main HTML template
│-- package.json           # Project metadata and dependencies
│-- package-lock.json      # Lockfile for dependency versions
│-- postcss.config.js      # PostCSS configuration
│-- README.md              # Project documentation (this file)
│-- tailwind.config.js     # Tailwind CSS configuration
│-- tsconfig.app.json      # TypeScript configuration for application
│-- tsconfig.json          # Root TypeScript configuration
│-- tsconfig.node.json     # TypeScript configuration for Node.js
│-- vercel.json            # Vercel deployment configuration
│-- vite.config.ts         # Vite configuration file
```

Explanation of Key Directories and Files

- .vscode/: Contains workspace settings specific to Visual Studio Code.
- node_modules/: Directory where all the installed dependencies are stored.
- public/: Contains static assets like the favicon, manifest, and other files that do not change during the application runtime.
- src/: Main source code directory.
  - assets/: Contains images, icons, and other static resources.
  - components/: Reusable UI components.
  - constant/: Constants and configuration values used throughout the application.
  - context/: React Context API for state management.
  - hoc/: Higher-order components (HOCs) that enhance or modify other components.
  - hooks/: Custom React hooks for reusable logic.
  - layout/: Layout components such as Header and Footer.
  - lib/: Utility libraries and helper functions.
  - page/: Page-level components like Home and Dashboard.
  - routes/: React Router configuration for defining application routes.
  - store/: Redux store configuration (if applicable).
  - types/: TypeScript type definitions.
  - App.tsx: Main App component that serves as the root component.
  - index.css: Global styles for the application.
  - main.tsx: Entry point of the application.
- vite-env.d.ts: TypeScript environment type definitions for Vite.
- .env: Environment variables for the application.
- .env.example: Example environment file to demonstrate required variables.
- components.json: JSON file for component configuration.
- eslint.config.js: ESLint configuration for code linting.
- index.html: Main HTML template for the application.
- package.json: Contains project metadata and dependencies.
- package-lock.json: Lockfile for dependency versions.
- postcss.config.js: PostCSS configuration for processing CSS.
- README.md: Project documentation (this file).
- tailwind.config.js: Tailwind CSS configuration.
- tsconfig.app.json: TypeScript configuration for the application.
- tsconfig.json: Root TypeScript configuration.
- tsconfig.node.json: TypeScript configuration for Node.js.
- vercel.json: Configuration for deploying the application on Vercel.
- vite.config.ts: Configuration file for Vite, the build tool.

This structure ensures that the project is organized, making it easier to navigate and maintain.

# Next.js CRUD Note App

This is a simple CRUD (Create, Read, Update, Delete) note-taking application built using Next.js. It allows users to add, edit, and delete notes.

## Features

- Add new notes
- Edit existing notes
- Delete notes
- Responsive design for various screen sizes

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **MongoDB**: A NoSQL database used for storing note data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Tailwind CSS**: A utility-first CSS framework used for styling.

## Getting Started

1. Clone the Repository: Start by cloning the repository to your local machine using the following command:

```bash
git clone https://github.com/lomsadze123/First-NextJs.git
```

2. Install Dependencies: Install the project dependencies using npm:

```bash
npm install
```

3. Set up your MongoDB database and update the connection string in config/database.ts with your MongoDB URI.

4. Create a .env file in the root directory and add your MongoDB URI:

```bash
MONGODB_URL=your-mongodb-uri
```

5. Start the Application: Run the development server to see the application in action:

```bash
npm run dev
```

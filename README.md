
# To-Do Application

## Description
A simple To-Do application built with Node.js and MongoDB that allows users to add, edit, delete tasks, and mark them as complete or incomplete.

## Features
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Store tasks in MongoDB

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Libraries**: Mongoose, CORS, Body-Parser

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bhavaniviswanadham/To-Do-ListApplication.git
   cd todo-app
2. Install dependencies:
   bash
   npm install
3. Start your MongoDB server:
   Open a terminal and run:
   bash
   mongod
   This will start the MongoDB server, usually listening on localhost:27017.
4. Connect to MongoDB using mongosh:

   Open another terminal and run:
   bash
   mongosh
   Create the todo-app database and the tasks collection:
   use todo-app
   db.createCollection('tasks')
5. Running the Application
   
   Start the Node.js server:
   bash
   node server.js
   Open your browser and navigate to http://localhost:5000 to access the application.

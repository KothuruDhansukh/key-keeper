
# KeyKeeper

A secure, user-friendly password manager with modern UI and MongoDB integration.

## Demo
https://kothurudhansukh.github.io/key-keeper/
## Tech Stack 
- **Node.js:** Backend JavaScript runtime environment
- **Express.js:** Web framework for Node.js
- **MongoDB:** NoSQL database for storing credentials
- **React.js:** Frontend JavaScript library for building user interfaces
- **Tailwind CSS:** Utility-first CSS framework for styling
- **Lordicons:** Source for animated icons
- **Toastify:** Library for toast notifications
## Features

- Responsive design for both mobile and PC
- Hide/unhide functionality for passwords
- Dynamic table for storing credentials (website, username, password)
- Editing and deleting options for saved passwords
- Toast notifications for user interactions
- MongoDB for persistent storage
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/KeyKeeper.git
    ```
2. Navigate to the project directory:   

    ```bash
    cd KeyKeeper
    ```

3. Set up environment variables for MongoDB:
    
    - Add your MongoDB connection string in the .env file
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    ```
4. Install dependencies in the main project folder:
    ```bash
    npm install
    ```
5. To run the frontend and backend:

    - In the main folder, start the development server

        ```bash
        npm run dev
        ```
    - In the backend folder, start the backend server:
        ```bash
        cd backend
        node --watch server.js
        ```
6. Open your browser and go to http://localhost:3000 to access the application.


## Usage

1. After starting both the frontend and backend servers, open your browser and go to:

```bash
http://localhost:3000

```
2. Use the interface to:

- Add new credentials (website URL, username, and password).
- View, edit, or delete saved credentials.
- Use the hide/unhide button to toggle password visibility.
- Receive toast notifications for user actions like saving or deleting a password.

3. All passwords and data are stored in the MongoDB database for persistence.


// Importing required packages
const express = require("express") // Express is a web framework for Node.js
const { connectToDatabase } = require("./db/dbConnection") // Importing the database connection function from dbConnection.js
const User = require("./db/user") // Importing the User model from user.js (this should represent a MongoDB user schema)
const app = express() // Creating an instance of an Express application
const cors = require("cors") // CORS is used to allow cross-origin requests from different domains

const port = 8000; // Setting the port number where the server will listen for requests

// Connect to MongoDB database
connectToDatabase();

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log("Server Started At Port 8000"); // Log a message when the server starts successfully
});

// Middleware to parse incoming JSON request bodies
app.use(express.json()); // This allows the server to accept and parse JSON data in incoming requests

// Middleware to enable CORS for requests from a specific frontend URL
// CORS is essential when the frontend (e.g., React app) is hosted on a different port or domain
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests only from the React app running on localhost:5173

// Route to handle user registration
app.post("/register", async (req, res) => {
    try {
        // Destructure the username and password from the request body
        const { username, password } = req.body;
        
        // Logging the request body for debugging purposes
        console.log(req.body);
        
        // Create a new user instance with the provided username and password
        const newUser = new User({ username, password });
        
        // Save the user to the MongoDB database
        await newUser.save();
        
        // Respond with a success message and status 201 (Created)
        res.status(201).json({ "message": "Registered Successfully" });
    } catch (error) {
        // Log any errors that occur during registration
        console.log("Error happened while registering user: ", error);
        
        // Respond with an error message and status 500 (Internal Server Error)
        res.status(500).json({ "error": `Registration Failed ${error}` });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    try {
        // Destructure the username and password from the request body
        const { username, password } = req.body;
        
        // Find a user in the database with the provided username
        const user = await User.findOne({ username });
        
        // Check if the user exists in the database
        if (!user) {
            // If the user is not found, respond with a 401 (Unauthorized) status
            res.status(401).json({ "error": "Invalid username or password" });
        }
        // Check if the provided password matches the stored password for the user
        else if (user.password != password) {
            // If the password does not match, respond with a 401 status
            res.status(401).json({ "error": "Invalid username or password" });
        } else {
            // If the username and password are correct, respond with a success message
            res.json({ "Success": "You have successfully logged in" });
        }

    } catch (error) {
        // Log any errors that occur during login
        console.error("Error while login: ", error);
        
        // Respond with a 404 status and a message about the server error
        res.status(404).json({ "Error": `Error: Can't login, error happened at server ${error}` });
    }
});

// Importing mongoose package to interact with MongoDB
const mongoose = require("mongoose")

// This is an async function that establishes a connection to the MongoDB database
const connectToDatabase = async () => {
    try {
        // Attempt to connect to the MongoDB server using the mongoose.connect() method
        // 'mongodb://localhost:27017/my-database' is the connection string where:
        // - 'mongodb://localhost:27017' specifies that MongoDB is running locally on port 27017 (default port)
        // - 'my-database' is the name of the database to connect to; if it doesn't exist, MongoDB will create it
        await mongoose.connect("mongodb://localhost:27017/my-database")
        
        // If connection is successful, log a success message to the console
        console.log("Connected To Database Successfully")
    } catch (error) {
        // If an error occurs during the connection attempt, catch it and log an error message to the console
        console.error("Error Happened while connecting to database", error)
    }
}

// Export the connectToDatabase function so it can be used in other files
module.exports = { connectToDatabase }

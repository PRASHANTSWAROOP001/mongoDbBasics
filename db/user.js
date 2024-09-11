// Importing the mongoose package to interact with MongoDB
const mongoose = require("mongoose");

// Defining a new schema for the 'User' model using Mongoose
// A schema defines the structure of the documents that will be stored in the MongoDB collection
const UserSchema = new mongoose.Schema({
    // Defining a 'username' field in the schema
    // 'type' specifies that this field is a string
    // 'required' enforces that this field must be provided (non-optional)
    // 'unique' ensures that no two documents in the collection can have the same 'username' value (i.e., usernames must be unique)
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Defining a 'password' field in the schema
    // 'type' specifies that this field is a string
    // 'required' ensures that a password is provided when creating a user
    password: {
        type: String,
        required: true,
    }
});

// Creating a model named 'Users' based on the UserSchema
// A model is a constructor compiled from the schema and represents the collection in the MongoDB database
// 'Users' is the name of the collection where the documents following this schema will be stored
const User = mongoose.model("Users", UserSchema);

// Exporting the 'User' model so it can be used in other parts of the application
module.exports = User;

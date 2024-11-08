// controllers/userController.js
const userService = require('../services/userService'); // Import the UserService for user operations

// Define the UserController class to handle HTTP requests related to user actions
class UserController {

    // Controller method to add a new user
    async addUser(req, res) {
        try {
            const { name, email, pass, gender, style, fav_color } = req.body; // Extract user data from request body
            const newUser = await userService.addUser({ name, email, pass, gender, style, fav_color }); // Call the service to add user
            res.status(201).json(newUser); // Send back the newly created user with status 201
        } catch (e) {
            console.error('Error creating user:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }

    // Controller method to get all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers(); // Call the service to get all users
            res.status(200).json(users); // Respond with the list of users and status 200
        } catch (e) {
            console.error('Error fetching users:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }

    // Controller method to get a user by their ID
    async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Convert ID parameter to integer
            const user = await userService.getUserById(id); // Call the service to get user by ID
            if (!user) {
                return res.status(404).json({ message: 'User not found' }); // Respond with 404 if user not found
            }
            res.status(200).json(user); // Respond with the user data and status 200
        } catch (e) {
            console.error('Error fetching user:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }

    // Controller method to update a user's data
    async saveUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Convert ID parameter to integer
            const { name, email, pass, gender, style, fav_color } = req.body; // Extract updated user data from request body
            const success = await userService.saveUser(id, { name, email, pass, gender, style, fav_color }); // Call the service to update user
            if (!success) {
                return res.status(404).json({ message: 'User not found or no changes made' }); // Respond with 404 if user not found or no update occurred
            }
            res.status(200).json({ message: 'User updated successfully' }); // Respond with success message and status 200
        } catch (e) {
            console.error('Error saving user:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }

    // Controller method to delete a user by their ID
    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10); // Convert ID parameter to integer
            const success = await userService.deleteUser(id); // Call the service to delete user
            if (!success) {
                return res.status(404).json({ message: 'User not found' }); // Respond with 404 if user not found
            }
            res.status(200).json({ message: 'User deleted successfully' }); // Respond with success message and status 200
        } catch (e) {
            console.error('Error deleting user:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }

    // Controller method to check user login credentials
    async checkLogin(req, res) {
        try {
            const { name, pass } = req.body; // Extract login credentials from request body
            const success = await userService.checkLogin(name, pass); // Call the service to check login credentials
            if (!success) {
                return res.status(401).json({ message: 'Incorrect Username or Password' }); // Respond with 401 if login fails
            }
            res.status(200).json({ message: 'User login successful' }); // Respond with success message and status 200
        } catch (e) {
            console.error('Error during login:', e); // Log error to the console
            res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 error
        }
    }
}

module.exports = new UserController(); // Export an instance of UserController

const userService = require('../services/userService');

exports.getUserDetails = async (req, res) => {
    try {
        const users = await userService.getUserDetails();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Additional controller methods like getUserById, createUser, etc.

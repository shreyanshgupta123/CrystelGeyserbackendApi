const User = require('../model/userModel');
const UserAddress = require('../model/userAddress');

const getAllUsers = async () => {
    return await User.findAll({ include: UserAddress });
};

// Additional service methods

module.exports = { getAllUsers };

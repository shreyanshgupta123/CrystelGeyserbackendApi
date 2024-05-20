const User = require('../models/userModel');
const UserAddress = require('../models/userAddressModel');

const getAllUsers = async () => {
    return await User.findAll({ include: UserAddress });
};

// Additional service methods

module.exports = { getAllUsers };

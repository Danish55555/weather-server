const apiResponse = require("../apiResponse/apiResponse");
const userModel = require("../models/userModel");
exports.createUser = async (req, res) => {
    try {
        const { name, password, country, email } = req.body;
        if (!name || !password || !country || !email) {
            throw new Error("Please provide all data related to password,name, country");
        }
        const alreadyExistedUser = userModel.exists({ email });
        if (alreadyExistedUser) {
            throw new Error("User with provided email already exists")
        }
        const user = await userModel.create({ name, password, country, email });
        return apiResponse.success(res, req, user)

    } catch (err) {
        apiResponse.fail(res, err.message);
    }

}
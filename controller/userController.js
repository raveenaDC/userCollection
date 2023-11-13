const userModel = require('../models/userModel')
const Helper = require('../Helpers/helper')

// create user
module.exports.userRegistration = async (req, res) => {
    try {
        if (!req.body.name || !req.body.age || !req.body.city) {
            return res.send("fields missing");
        }
        const user = new userModel({
            name: req.body.name,
            userName: req.body.userName,
            password: req.body.password,
            age: req.body.age,
            address: { state: req.body.city, city: req.body.city }

        })
        await user.save()
        res.send("Registration Successful")
    }
    catch (err) {
        res.send("error", err)
        // console.log(err);
    }
}

// create user
module.exports.userLogin = async (req, res) => {
    try {
        if (!req.body.password || !req.body.username)
            return res.send("you are missing something...")
        const user = await userModel.findOne({ username: req.body.username })
        if (!user)
            return res.send("username not found")
        if (user.password == req.body.password) {
            let Token = Helper.generateTokens(user._id, user.userName);
            return res.send({
                message: "login successfully", Token: Token
            })
        } else {
            return res.send("password not match")
        }
    }
    catch (err) {
        res.send("error", err)

    }

}

// ALL Users
module.exports.userList = async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(users)
    }
    catch (err) {
        res.send("error", err)
    }

}

// users within the same city
module.exports.listUserByCity = async (req, res) => {
    try {
        const users = await userModel.find({ 'address.city': req.body.city });
        res.send(users)
    }
    catch (err) {
        res.send("error", err)
    }

}

// users within the same state
module.exports.listUserByState = async (req, res) => {
    try {
        const users = await userModel.find({ 'address.state': req.body.state });
        res.send(users)
    }
    catch (err) {
        res.send("error", err)
    }

}


// DELETE PARTICULAR USER
module.exports.userRemove = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)
        if (!user)
            return res.send('No User Found')
        await user.remove();
        res.send("user deleted")
    }
    catch (err) {
        res.send("error", err)
    }


}

// UPDATE ONE USING updateOne 
module.exports.userUpdateOne = async (req, res) => {
    try {
        const data = await userModel.updateOne({ _id: req.body.id }, { $set: req.body });

        res.send({ result: data, message: "Data Updated Successfully" })
    }
    catch (err) {
        res.send("error", err)
    }
}

// UPDATE ONE USING updateMany
module.exports.userUpdateMany = async (req, res) => {
    try {
        const data = await userModel.updateMany({ age: { $gte: 15 } }, { $set: req.body });
        res.send({ result: data, message: "Data Updated Successfully" })
    }
    catch (err) {
        res.send("error", err)
    }
}

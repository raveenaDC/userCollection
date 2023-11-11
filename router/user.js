const express = require('express')
const userModel = require('../models/userModel')
const router = express.Router();

// create user
router.post('/register', async (req, res) => {
    try {
        if (!req.body.name || !req.body.age || !req.body.city) {
            return res.send("fields missing");
        }
        const user = new userModel({
            name: req.body.name,
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
})

// ALL Users
router.get('/all-user', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(users)
    }
    catch (err) {
        res.send("error", err)
    }

})

// users within the same city
router.get('/city-user', async (req, res) => {
    try {
        const users = await userModel.find({ 'address.city': req.body.city });
        res.send(users)
    }
    catch (err) {
        res.send("error", err)
    }

})

// users within the same state
router.get('/state-user', async (req, res) => {
    try {
        const users = await userModel.find({ 'address.state': req.body.state });
        res.send(users)
    }
    catch (err) {
        res.send("error", err)
    }

})


// DELETE PARTICULAR USER
router.delete('/user/delete/:userId', async (req, res) => {
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


})

// UPDATE ONE USING updateOne 
router.patch('/user/update', async (req, res) => {
    try {
        const data = await userModel.updateOne({ _id: req.body.id }, { $set: req.body });

        res.send({ result: data, message: "Data Updated Successfully" })
    }
    catch (err) {
        res.send("error", err)
    }
})

// UPDATE USING updateMany
router.patch('/user/update-many', async (req, res) => {
    try {
        const data = await userModel.updateMany({ age: { $gte: 15 } }, { $set: req.body });
        res.send({ result: data, message: "Data Updated Successfully" })
    }
    catch (err) {
        res.send("error", err)
    }
})


module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("./userSchema");

// Add express.json() middleware to parse the request body


// Post Method

router.post("/User", async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    age: req.body.age,
    favoriteFoods: req.body.favoriteFoods,
  });

  res.status(200).json({
    msg: "User created",
    newUser
  });
});


// GET Method

router.get("/User", async (req, res) => {
  try {
    const newUser = await User.find();
    res.status(200).json({
      msg: "succes",
      newUser
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
});

// Get all collection with the same name

router.get("/User/name/:name", async (req, res) => {
  try {
    const newUser = await User.find({
      name: req.params.name
    })
    res.status(200).json({
      msg: "succes",
      newUser
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
});


// GET findOne Method by favoriteFoods

router.get("/User/food/:foodname", async (req, res) => {
  try {
    const users = await User.find({
      favoriteFoods: req.params.foodname
    }).exec();
    if (users.length === 0) return res.status(404).json({
      msg: "User not found"
    });
    res.status(200).json({
      msg: "success",
      users
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
});


// GET by ID Method

router.get("/User/:id", async (req, res) => {
  try {
    const newUser = await User.findById(req.params.id);
    if (!newUser) return res.status(404).json({
      msg: "User not found"
    });
    res.status(200).json({
      msg: "succes",
      newUser
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
});

// UPDATE Method by FOOD

router.put('/User/:id', (req, res) => {
  User.findById(req.params.id)
    .then(User => {
      User.favoriteFoods.push(...req.body.favoritefoods);
      return User.save();
    })
    .then(updatedUser => {
      res.send(updatedUser);
    })
    .catch((err) => {
      console.log(err);
    });
});


// UPDATE Method by NAME

router.put('/User/name/:name', async (req, res) => {
  await User.findOneAndUpdate({
      name: req.params.name
    }, {
      age: 20
    }, {
      new: true
    })
    .then(updatedUser => {
      res.send(updatedUser);
    })
    .catch(err => {
      console.log(err);
    });
});


// DELETE By Id And Remove Method

router.delete('/User/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(deletedUser => {
      res.send(`${deletedUser.name} is deleted`)
    }).catch(err => {
      console.error(err)
    })
})

// Remove Method

router.delete("/User", async (req, res) => {
  const name = req.query.name;
  try {
    const deletedUsers = await User.deleteMany({
      name
    });
    if (deletedUsers.deletedCount === 0) {
      return res.status(404).json({
        msg: "User not found"
      });
    }
    res.status(200).json({
      msg: "Users deleted",
      deletedCount: deletedUsers.deletedCount
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
});


// GET Method

router.get("/User/favoriteFoods/Riz", async (req, res) => {
  try {
    const data = await User.find({
        favoriteFoods: "Riz"
      })
      .sort({
        name: 1
      })
      .limit(2)
      .select("-age");
    if (!data || data.length === 0) {
      return res.status(404).json({
        msg: "Users not found"
      });
    }
    res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});



module.exports = router;
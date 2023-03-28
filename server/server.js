const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const { Sequelize } = require("sequelize");
const { users } = require("./models");
const db = process.env.DB;
const sequelize = new Sequelize(`${db}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.put("/api/dashboard/:username", async (req, res) => {
  let username = req.params.username;
  let updatedUsername = req.body.username;
  let updatedFirstName = req.body.firstName;
  let updatedLastName = req.body.lastName;
  let updatedEmail = req.body.email;
  let updatedPassword = req.body.password;

  await users.update(
    {
      username: updatedUsername,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
      password: updatedPassword,
    },
    {
      where: {
        email: email,
      },
    }
  );
  res.json("Your account has been updated!");
});

app.put("/api/tbr", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedTBR = req.body.tbr;
  let preview = req.body.preview;
  let thumbnail = req.body.thumbnail;

  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });

  let newTBRList = selectedAcct.dataValues.tbr;
  if (newTBRList == null) {
    newTBRList = [];
    newTBRList.push(updatedTBR, preview, thumbnail);
  }

  if (!newTBRList.includes(updatedTBR)) {
    newTBRList.push(updatedTBR, preview, thumbnail);
  } else {
    console.log("Already in list :D");
  }
  try {
    let updatedList = await users.update(
      {
        tbr: newTBRList,
      },
      {
        where: {
          id: updatedUserID,
        },
      }
    );
    res.send(updatedList);
  } catch (err) {
    console.log(err);
    res.json("in the put catch of /api/tbr");
  }
});

app.put("/api/read", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedREAD = req.body.read;
  let preview = req.body.preview;
  let thumbnail = req.body.thumbnail;

  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });

  let newREADList = selectedAcct.dataValues.read;
  if (newREADList == null) {
    newREADList = [];
    newREADList.push(updatedREAD, preview, thumbnail);
  }

  if (!newREADList.includes(updatedREAD)) {
    newREADList.push(updatedREAD, preview, thumbnail);
  } else {
    console.log("Already in list :D");
  }
  try {
    let updatedList = await users.update(
      {
        read: newREADList,
      },
      {
        where: {
          id: updatedUserID,
        },
      }
    );
    res.send(updatedList);
  } catch (err) {
    console.log(err);
    res.json("in the put catch of /api/read");
  }
});

app.put("/api/favorite", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedFAV = req.body.favorite;
  let preview = req.body.preview;
  let thumbnail = req.body.thumbnail;

  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });

  let newFAVList = selectedAcct.dataValues.favorite;
  if (newFAVList == null) {
    newFAVList = [];
    newFAVList.push(updatedFAV, preview, thumbnail);
  }

  if (!newFAVList.includes(updatedFAV)) {
    newFAVList.push(updatedFAV, preview, thumbnail);
  } else {
    console.log("Already in list :D");
  }
  try {
    let updatedList = await users.update(
      {
        favorite: newFAVList,
      },
      {
        where: {
          id: updatedUserID,
        },
      }
    );
    res.send(updatedList);
  } catch (err) {
    console.log(err);
    res.json("in the put catch of /api/tbr");
  }
});

app.delete("/api/dashboard/:username", async (req, res) => {
  let username = req.params.username;
  await users.destroy({ where: { username: username } });
  res.json("User successfully deleted.");
});

app.post("/api/register", async (req, res) => {
  let { firstName, lastName, username, email, password } = req.body;

  try {
    let records = await users.findAll({ where: { email } });
    if (records.length === 0) {
      password = bcrypt.hashSync(password, 8);

      await users.create({ firstName, lastName, username, email, password });
      return res.json({ username: username });
    } else {
      return res.status(422).json({ error: "Email already exists" });
    }
  } catch (err) {
    return res.status(423).json({ error: "Can't access database" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await users.findOne({ where: { email: email } });

    let result = bcrypt.compareSync(password, user.password);

    if (result) {
      console.log("Passwords Match!");
      let userID = user.dataValues.id;
      res.send({ id: userID });
      // res.redirect("http://localhost:3000/home");
    } else {
      // password is incorrect
      //       res.render('login', {message: 'Incorrect username or password'});
      console.log("Incorrect username or password");
      res.json("Incorrect username or password");
    }
  } catch (error) {
    console.log(error);
    //   res.render('login', {message: 'An error has occurred'});
    res.json(error);
  }
});

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

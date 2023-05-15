const express = require("express");
const cors = require("cors");
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
app.options("*", cors());

//* GET Routes
app.get("/api/user", async (req, res) => {
  let userID = req.headers.id;
  try {
    const userLoggedIn = await users.findOne({
      where: {
        id: userID,
      },
    });
    let userInfo = [];
    userInfo.push(
      userLoggedIn.username,
      userLoggedIn.firstName,
      userLoggedIn.lastName,
      userLoggedIn.email
    );
    res.json(userInfo);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/tbrList", async (req, res) => {
  let updatedUserID = req.headers.id;
  try {
    const userLoggedIn = await users.findOne({
      where: {
        id: updatedUserID,
      },
    });
    res.json(userLoggedIn.dataValues.tbr);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/readList", async (req, res) => {
  let updatedUserID = req.headers.id;
  try {
    const userLoggedIn = await users.findOne({
      where: {
        id: updatedUserID,
      },
    });
    res.json(userLoggedIn.dataValues.read);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/favoriteList", async (req, res) => {
  let updatedUserID = req.headers.id;
  try {
    const userLoggedIn = await users.findOne({
      where: {
        id: updatedUserID,
      },
    });
    res.json(userLoggedIn.dataValues.favorite);
  } catch (error) {
    console.log(error);
  }
});

//* POST Routes
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
  } catch (error) {
    return res.status(423).json({ error: "Cannot access database" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await users.findOne({ where: { email: email } });
    if (user !== null) {
      let result = bcrypt.compareSync(password, user.password);
      if (result) {
        let userID = user.dataValues.id;
        res.send({ id: userID });
      } else {
        res.json("Unable to login.");
      }
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//* PUT Routes
app.put("/api/userUpdate", async (req, res) => {
  let userIDs = req.body.id;
  let updatedUsername = req.body.username;
  let updatedFirstName = req.body.firstName;
  let updatedLastName = req.body.lastName;
  let updatedEmail = req.body.email;
  let updatedPassword = req.body.password;
  updatedPassword = bcrypt.hashSync(updatedPassword, 8);
  try {
    let updatedAccount = await users.update(
      {
        username: updatedUsername,
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
        password: updatedPassword,
      },
      {
        where: {
          id: userIDs,
        },
      }
    );
    res.send(updatedAccount);
  } catch (error) {
    console.log(error);
  }
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
  let newTBRList = "";
  if (selectedAcct.dataValues !== null) {
    newTBRList = selectedAcct.dataValues.tbr;
  }
  if (newTBRList == null) {
    newTBRList = [];
    newTBRList.push(updatedTBR, preview, thumbnail);
  }
  if (!newTBRList.includes(updatedTBR)) {
    newTBRList.push(updatedTBR, preview, thumbnail);
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
  }
});

app.put("/api/favorite", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedFavorite = req.body.favorite;
  let preview = req.body.preview;
  let thumbnail = req.body.thumbnail;
  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });
  let newFavoriteList = "";
  if (selectedAcct.dataValues !== null) {
    newFavoriteList = selectedAcct.dataValues.favorite;
  }
  if (newFavoriteList == null) {
    newFavoriteList = [];
    newFavoriteList.push(updatedFavorite, preview, thumbnail);
  }
  if (!newFavoriteList.includes(updatedFavorite)) {
    newFavoriteList.push(updatedFavorite, preview, thumbnail);
  }
  try {
    let updatedList = await users.update(
      {
        favorite: newFavoriteList,
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
  }
});

app.put("/api/read", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedRead = req.body.read;
  let preview = req.body.preview;
  let thumbnail = req.body.thumbnail;
  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });
  let newReadList = "";
  if (selectedAcct.dataValues !== null) {
    newReadList = selectedAcct.dataValues.read;
  }
  if (newReadList == null) {
    newReadList = [];
    newReadList.push(updatedRead, preview, thumbnail);
  }
  if (!newReadList.includes(updatedRead)) {
    newReadList.push(updatedRead, preview, thumbnail);
  }
  try {
    let updatedList = await users.update(
      {
        read: newReadList,
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
  }
});

app.put("/api/tbr/remove", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedTBR = req.body.tbr;
  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });
  let newTBRList = [];
  if (selectedAcct.dataValues !== null) {
    newTBRList = selectedAcct.dataValues.tbr;
    if (newTBRList.includes(updatedTBR)) {
      const bookList = newTBRList.indexOf(updatedTBR);
      if (bookList > -1) {
        newTBRList.splice(bookList, 3);
      }
    }
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
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/read/remove", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedRead = req.body.read;
  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });
  let newReadList = [];
  if (selectedAcct.dataValues !== null) {
    newReadList = selectedAcct.dataValues.read;
    if (newReadList.includes(updatedRead)) {
      const bookList = newReadList.indexOf(updatedRead);
      if (bookList > -1) {
        newReadList.splice(bookList, 3);
      }
    }
  }
  try {
    let updatedList = await users.update(
      {
        read: newReadList,
      },
      {
        where: {
          id: updatedUserID,
        },
      }
    );
    res.send(updatedList);
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/favorite/remove", async (req, res) => {
  let updatedUserID = req.body.id;
  let updatedFavorite = req.body.favorite;
  let selectedAcct = await users.findOne({
    where: {
      id: updatedUserID,
    },
  });
  let newFavoriteList = [];
  if (selectedAcct.dataValues !== null) {
    newFavoriteList = selectedAcct.dataValues.favorite;
    if (newFavoriteList.includes(updatedFavorite)) {
      const bookList = newFavoriteList.indexOf(updatedFavorite);
      if (bookList > -1) {
        newFavoriteList.splice(bookList, 3);
      }
    }
  }
  try {
    let updatedList = await users.update(
      {
        favorite: newFavoriteList,
      },
      {
        where: {
          id: updatedUserID,
        },
      }
    );
    res.send(updatedList);
  } catch (error) {
    console.log(error);
  }
});

//* DELETE Routes
app.delete("/api/user/delete", async (req, res) => {
  let userID = req.body.id;
  await users.destroy({ where: { id: userID } });
  res.json("User successfully deleted.");
});

//* Connection Good
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

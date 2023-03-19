const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const { Sequelize } = require("sequelize");
const { books, users } = require("./models");
const db = process.env.DB;
const sequelize = new Sequelize(`${db}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const bookshelf = await books.findAll();
  console.log(bookshelf);
  res.send(bookshelf);
});

app.post("/", async (req, res) => {
  await books.create({
    title: req.body.title,
    description: req.body.description,
    edition: req.body.edition,
    isbn: req.body.isbn,
    author: req.body.author,
    pages: req.body.pages,
    rating: req.body.rating,
    reviews: req.body.reviews,
  });
  let newBook = await books.findAll({
    where: {
      title: req.body.title,
      author: req.body.author,
      edition: req.body.edition,
      isbn: req.body.isbn,
      rating: req.body.rating,
    },
  });
  res.send(newBook);
});

app.put("/dashboard/:username", async (req, res) => {
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
        username: username,
      },
    }
  );
  res.json("Your account has been updated!");
});

app.delete("/dashboard/:username", async (req, res) => {
  let username = req.params.username;
  await users.destroy({ where: { username: username } });
  res.json("User successfully deleted.");
});

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await users.findOne({ where: { email: email } });

    let result = bcrypt.compareSync(password, user.password);

    if (result) {
      console.log("Passwords Match!");
      res.redirect("/");
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

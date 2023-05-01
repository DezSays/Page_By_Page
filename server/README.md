# Page_By_Page - PostgreSQL Database and Express Server

This repository contains the PostgreSQL database and Express server for the "Page By Page" web application, a platform where users can search book titles or authors and save them to their bookshelf.

## Database Schema

The database schema for the server code is defined by the Sequelize ORM (Object-Relational Mapping) library, which maps the JavaScript objects to database tables and their attributes to columns.

The database schema consists of a single table named `users`, which has the following columns:

- `id`: An auto-incrementing integer value that serves as the primary key of the table.
- `firstName`: A string value representing the user's first name.
- `lastName`: A string value representing the user's last name.
- `username`: A string value representing the user's username.
- `email`: A string value representing the user's email address.
- `password`: A string value representing the user's password, which is hashed using the bcrypt library before being stored in the database.
- `favorite`: An array of strings representing the user's favorite books.
- `read`: An array of strings representing the books that the user has read.
- `tbr`: An array of strings representing the books that the user wants to read (i.e., "to be read").

The data type of each column is defined using the Sequelize library's DataTypes module, which provides a set of data types that can be used to define the schema. The schema is defined in the `models` directory of the server code, specifically in the `users.js` file.

## Tech Stack

The tech stack used in the server-side code of the Page_By_Page project can be found in the `package.json` file. The file lists all the dependencies required to run the server and build the application.

The server is built using Node.js, an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It uses Express, a fast, unopinionated, minimalist web framework for Node.js that provides features for web and mobile applications.

The database used is PostgreSQL, an open-source relational database management system that is known for its stability, scalability, and performance. To interact with the database, the project uses Sequelize, a promise-based ORM (Object Relational Mapper) for Node.js that supports multiple database systems.

The server is written in JavaScript and uses ES6 syntax, which is transpiled into ES5 using Babel, a JavaScript compiler that can convert newer versions of JavaScript into a backward-compatible version that can run on older browsers.

Other dependencies used in the project include:

- `bcrypt`: A library for hashing and salting passwords to secure user accounts.
- `cors`: A middleware for enabling Cross-Origin Resource Sharing, which allows web pages from different origins to access the server's resources.
- `dotenv`: A module for loading environment variables from a `.env` file.
- `nodemon`: A utility that automatically restarts the server when changes are made to the code.

Overall, the tech stack used in the server-side code of the Page_By_Page project is well-suited for building a robust, scalable, and secure web application.

## API Endpoints

This code starts the Express server and listens for incoming requests on the specified `PORT`. The `app.listen()` method takes two arguments: the `PORT` number and a callback function that will be executed once the server starts listening on the specified port. The callback function logs a message to the console indicating that the server is listening on the specified port. It then attempts to authenticate the database connection using Sequelize's `authenticate()` method. If the authentication is successful, the function logs a message to the console indicating that the connection has been established successfully. This means that the server can communicate with the database and perform operations on it. If the authentication fails, the function logs an error message to the console indicating that the server was unable to connect to the database. This could be due to an incorrect database configuration or network issues. Overall, this code initializes the Express server, sets it to listen on a specified port, and verifies that it can connect to the database. This is an important step in ensuring that the application is functioning properly and is able to access and manipulate the data stored in the database.

```javascript
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
```

- `POST /api/register`: Creates a new user. <br/>
This is an Express route handler that handles POST requests sent to the `/api/register` endpoint. It expects to receive a JSON object in the request body that contains the user's `firstName`, `lastName`, `username`, `email`, and `password`. The route handler first extracts these values from the request body using destructuring assignment. It then queries the `users` table in the database to check if the email already exists. This is done using the `findAll()` method of the `users` model, which returns an array of user records that match the specified criteria. If no records are found, it means the email is available, and the user is created in the database using the `create()` method of the `users` model. The user's password is hashed using bcrypt with a salt of 8, which makes it more secure. Finally, the route handler sends a JSON response to the client with the new user's `username`. If the email already exists, the route handler returns a 422 status code with an error message. If there is an error accessing the database, the route handler returns a 423 status code with an error message. This code is responsible for handling user registration and ensuring that each user has a unique email address. It uses Sequelize, an ORM, to interact with the database, and bcrypt, a library for hashing and salting passwords, to secure user accounts. The use of async/await allows for more concise and readable code, making it easier to handle errors.

```javascript
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
```

- `POST /api/login`: User login. <br/>
This code defines an HTTP POST request endpoint `/api/login` on an Express.js server. When a client sends a request to this endpoint, it expects to receive login credentials in the request body in the form of an email and password. The code first extracts the email and password from the request body using destructuring assignment. It then queries the `users` table in the database using the Sequelize ORM's `findOne` method, looking for a user with a matching email address. If a matching user is found, the code uses the `bcrypt` library to compare the password provided by the client with the hashed password stored in the database for the user. If the passwords match, the code generates a JSON response containing the user's ID and sends it back to the client using the `res.send` method. If the passwords do not match, the code sends a JSON response containing an error message using the `res.json` method. If an error occurs during the execution of the code, it is caught in a try-catch block, and the error message is logged to the console and returned to the client as a JSON response using the `res.json` method.

```javascript
app.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await users.findOne({ where: { email: email } });
    if(user !== null)
    {
    let result = bcrypt.compareSync(password, user.password);
    if (result) {
      let userID = user.dataValues.id;
      res.send({ id: userID });
    } else {
      res.json("Unable to login.");
    }}
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
```

- `PUT /api/read`: Update read list. <br/>
This code sets up an API endpoint for updating a user's read list in the database. The endpoint listens for a PUT request on the `/api/read` route. When a PUT request is received, the function extracts the required data from the request body: `id`, `read`, `preview`, and `thumbnail`. These fields represent the unique identifier of the user, the book they have read, and preview and thumbnail information related to the book. The function then attempts to find the user with the specified `id` using Sequelize's `findOne()` method. If a user is found, the function extracts the user's current read list from the database. If the user's read list is currently empty, a new list is initialized with the data extracted from the request body. If the list is not empty, the function checks whether the book specified in the request body is already in the list. If it is not, the book information is added to the list. Finally, the function updates the user's read list in the database using Sequelize's `update()` method. It sends the updated list as a response to the client. If an error occurs during the update process, the function logs the error to the console. Overall, this code provides an API endpoint for updating a user's read list in the database. It uses Sequelize to interact with the database and handles potential errors that may occur during the update process.

```javascript
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
```

- `PUT /api/tbr/remove`: Removes book from TBR list. <br/>
This code defines a PUT API endpoint for removing a book from the "to be read" (TBR) list of a user. When a request is made to this endpoint, it expects to receive the user's ID and the book to be removed from the TBR list in the request body. The code first extracts the user ID and book to be removed from the request body. It then queries the database to find the user's account using the user ID. The `findOne` method is used to find the user's account based on the `id` field. Next, the code extracts the current TBR list for the user and initializes an empty list for the updated TBR list. If the user has any books in their TBR list, the code checks if the book to be removed exists in the TBR list. If the book exists in the TBR list, the code removes the book from the list. The code then updates the user's TBR list in the database with the updated TBR list using the `update` method of the `users` model. The `update` method takes two parameters: the first parameter specifies the fields to be updated, and the second parameter specifies the conditions to identify the record to be updated (in this case, the user's ID). If the update is successful, the updated TBR list is returned in the response. Otherwise, an error message is logged to the console.

```javascript
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
```

## Contributing

If you would like to contribute to this repository, please fork the repository, make your changes, and submit a pull request.


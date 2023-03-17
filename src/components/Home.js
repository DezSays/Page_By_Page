import React, { useState } from "react";
import BookDetails from "./BookDetails";

const Home = () => {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);

  const searchBook = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const items = data.items;
          setBookList(items);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Enter Your Book Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={searchBook}
        />
        <button>Search</button>
      </div>

      <div className="container">{<BookDetails bookList={bookList} />}</div>
    </>
  );
};
export default Home;

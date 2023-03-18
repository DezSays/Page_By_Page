import React, { useState } from "react";
import BookDetails from "./BookDetails";


const Home = () => {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);

  const fetchBooks = () => {

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
  const searchBook = (e) => {
    e = e || window.event;
    if (e.keyCode === 13) {
      fetchBooks()
    }
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="The Alchemist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchBook}
        />
        <button onClick={fetchBooks}>search</button>
      </div>

      <div className="container">{<BookDetails bookList={bookList} />}</div>
    </>
  );
};
export default Home;

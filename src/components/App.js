import React, { useState } from "react";



const App = () => {
  const [authors, setAuthors] = useState([])
  const [totalChapters, setTotalChapters] = useState(0)
  // const [cover, setCover] = useState('')
  const [description, setDescription] = useState("")
  const [genres, setGenres] = useState([])
  const [novelID, setNovelID] = useState(0)
  const [language, setLanguage] = useState("")
  const [sources, setSources] = useState('')
  const [rank, setRank] = useState(0)
  const [rating, setRating] = useState(0)
  const [amountOfRatings, setAmountOfRatings] = useState(0)
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')


  // /novel.{novel_id}

  const novelIDFunc = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'KEY',
      'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
    }
  };
  
  fetch('https://web-novel-api.p.rapidapi.com/novel/fa102782f605163ddc1b3341709fd70221b4e23b', options)
    .then(response => response.json())
    .then(data => {
      let tt = document.getElementById('test')
      let authorFetch = data.novel.author
      let authorsFormat = authorFetch.join(', ')
      let totalChaptersData = data.novel.chapters.total
      // let novelCover = "https://web-novel-api.p.rapidapi.com/"+data.novel.cover
      let novelDescriptions = data.novel.description
      let genreFetch = data.novel.genres
      let genreFormat = genreFetch.join(', ')
      let novID = data.novel.id 
      let lang = data.novel.language 
      let srcs = data.novel.sources 
      let srcFormat = srcs.join(', ')
      let rnk = data.novel.statistics.rank 
      let rate = data.novel.statistics.rating
      let numOfRatings = data.novel.statistics.ratings
      let statusOf = data.novel.status 
      let novelTitle = data.novel.title 
      setTotalChapters(totalChaptersData)
      // setCover(novelCover)
      setDescription(novelDescriptions)
      setGenres(genreFormat)
      setNovelID(novID)
      setLanguage(lang)
      setSources(srcFormat)
      setRank(rnk)
      setRating(rate)
      setAmountOfRatings(numOfRatings)
      setStatus(statusOf)
      setTitle(novelTitle)
      tt.innerHTML = `${description}`

      // .novel.statistics.views 
      // .novel.tags[array]             keywords 
      // let chapterListData = data.novel.chapters.list    //"/novel/fa102782f605163ddc1b3341709fd70221b4e23b/chapters"
      // .novel.chapters.original       int




      setAuthors(authorsFormat)
      
    }
    )
    .catch(err => console.error(err));
  }


// /genres
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'KEY',
// 		'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
// 	}
// };

// fetch('https://web-novel-api.p.rapidapi.com/genres', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// * Notes on above fetch call. Data:
// .genres[array]





// novels/{page} <- list of all novels in api
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'KEY',
// 		'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
// 	}
// };

// fetch('https://web-novel-api.p.rapidapi.com/novels/35', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// * Notes on above fetch call. Data:
// number at the end of the fetch call can range from 0-35
// .novels[array].chapters
// .novels[array].cover
// .novels[array].description
// .novels[array].id 
// .novels[array].title 










// /novel/{novel_id}/chapters/{source_id}

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'KEY',
// 		'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
// 	}
// };

// fetch('https://web-novel-api.p.rapidapi.com/novel/fa102782f605163ddc1b3341709fd70221b4e23b/chapters/cmVhZGxpZ2h0bm92ZWwubWU=', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// * Notes on above fetch call. Data:
// .chapters[array].title   chapter number
// .chapters[array].url     where to read










// /novel/{novel_id}/chapter/{chapter_id}
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'KEY',
// 		'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
// 	}
// };

// fetch('https://web-novel-api.p.rapidapi.com/novel/fa102782f605163ddc1b3341709fd70221b4e23b/chapter/aHR0cHM6Ly93d3cucmVhZGxpZ2h0bm92ZWwubWUvZ29ibGluLWtpbmdkb20vdm9sdW1lLTEvY2hhcHRlci1wcm9sb2d1ZQ==', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// * Notes on above fetch call. Data:
// .paragraphs --prologue of chapter
// .url        --url to prologue // continue reading




// /search/{query}
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'KEY',
// 		'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
// 	}
// };

// fetch('https://web-novel-api.p.rapidapi.com/search/Goblin%20Kingdom', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// * Notes on above fetch call. Data:
// .results[array].item.title
// .results[array].item.id 
// .results[array].item.author[array]
// .results[array].item.details
// .results[array].item.cover
// .results[array].item.chapters
// .results[array].score    1-10



  return (
    <div>
      <button onClick={novelIDFunc}>click to load</button>
      <h2>
        Authors: {authors}
      </h2>
      <h2>
        Total Chapters: {totalChapters}
      </h2>
      <h2>
        Description: {description}
      </h2>
      <h2>
        Genres: {genres}
      </h2>
      <h2>
        Novel ID: {novelID}
      </h2>
      <h2>
        Language(s): {language}
      </h2>
      <h2>
        Where to watch: {sources}
      </h2>
      <h2>
        Rank: {rank}
      </h2>
      <h2>
        Rating: {rating}
      </h2>
      <h2>
        Total ratings given: {amountOfRatings}
      </h2>
      <h2>
        Status: {status}
      </h2>
      <h2>
        Title: {title}
      </h2>
      <div id='test'>

      </div>
    </div>
  );
};

export default App;

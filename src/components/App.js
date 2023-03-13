import React from "react";



const App = () => {

  // /novel.{novel_id}
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': KEY,
  //     'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
  //   }
  // };
  
  // fetch('https://web-novel-api.p.rapidapi.com/novel/fa102782f605163ddc1b3341709fd70221b4e23b', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

// * Notes on above fetch call. Data:
// .novel.author[array]
// .novel.chapters.list           "/novel/fa102782f605163ddc1b3341709fd70221b4e23b/chapters"
// .novel.chapters.original       int
// .novel.chapters.total          int
// .novel.cover
// .novel.description
// .novel.genres[array]
// .novel.id
// .novel.language
// .novel.sources[array]
// .novel.statistics.rank
// .novel.statistics.rating       scale 1-10
// .novel.statistics.ratings      number of ratings given 
// .novel.statistics.views 
// .novel.status                  if there will be more chapters or if it has been completed
// .novel.title
// .novel.tags[array]             keywords 




// /genres
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': KEY,
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
// 		'X-RapidAPI-Key': KEY,
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
// 		'X-RapidAPI-Key': KEY,
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
// 		'X-RapidAPI-Key': KEY,
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
// 		'X-RapidAPI-Key': KEY,
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

    </div>
  );
};

export default App;

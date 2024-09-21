import { useState } from 'react'
import './App.css'
import Search from './assets/search.png'
import MovieCard from './MovieCard'

const API_URL = 'https://omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}'

function App() {
  const [movies, setMovies] = useState([])
  const [searchMovie, setSearchMovie] = useState("")

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json()

    setMovies(data.Search);
  }

  const handleSearch = (e) => { 
    if(e.key === 'Enter') {
      searchMovies(searchMovie)
    }
  };

  return (
    <>
      <div className="app">
        <h1>Aj's Movie Finder</h1>

        <div className="search">
          <input placeholder="Search For A Movie/TV show..." value={searchMovie} onChange={(e) => setSearchMovie(e.target.value)} onKeyDown={handleSearch}/>
          <img src={Search} alt="Search Icon" onClick={() => searchMovies(searchMovie)}/>
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ): (
          <div className="empty">
            <h2>Search for your favorite Movies and Series</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default App

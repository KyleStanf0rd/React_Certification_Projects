import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchMoviesHandler(){
    setIsLoading(true)
    setError(null)
    try {
      //default method is GET
      const response = await fetch('https://swapi.dev/api/films/')
      if(!response.ok){
        throw new Error('Something went wrong!')
      }

      const data = await response.json()


      const transformedMovies = data.results.map(moviedData => {
          return {
            id: moviedData.episode_id,
            title: moviedData.title,
            openingText: moviedData.opening_crawl,
            releaseDate: moviedData.release_date
          }
        }
      )
      setMovies(transformedMovies)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      
    }
    setIsLoading(false)
  }

  let content = <p>Found no movies.</p>
  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }
  if(isLoading){
    content = <p>LOADING...</p>
  }
  if(error){
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

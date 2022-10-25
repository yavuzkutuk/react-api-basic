import { useState } from 'react';
import axios from 'axios';
import './App.css';
import GifList from './GifList';
import SelectedGif from './SelectedGif';

const apiKey = '4N0IwbUYxHyLJW9pvX1gTgAVYYMcSOeM';

function App() {
  const [ gifs, setGifs] = useState();
  const [ query, setQuery] = useState('trees');
  const [ selectedGif, setSelectedGif] = useState();

  if(!gifs){
   axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=5`)
  .then(results => setGifs(results.data.data))
  }
  
  const handleLoadGifs = (e, q) => {
      axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=5`)
        .then(results => setGifs(results.data.data))
  }

  const handleChange = e => setQuery(e.target.value);

    // used when user clicks a gif
    const handleSelectGif = (clickedGif) => {
      setSelectedGif(clickedGif);
    }
  return (
    <>
    <h1>Giphy App</h1>
    <div>
      <input type="text" value={query} onChange={handleChange}/>
      <input type="submit" value="Search" onClick={handleLoadGifs}/>
    </div>
    <div className="content">
       <GifList gifs={gifs} onClick={handleSelectGif}/>
      {
        selectedGif && selectedGif.images &&
        <SelectedGif gif={selectedGif}/>
      } 
    </div>
  </>
  );
}

export default App;

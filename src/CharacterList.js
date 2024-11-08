import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MD5 from 'crypto-js/md5';

const CharacterList = ({ onSelectCharacter }) => {
  // State to hold the list of characters
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

    // Fetch characters from the Marvel API when the component mounts
  useEffect(() => {
    const fetchCharacters = async () => {
      const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
      const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const ts = Date.now().toString();
      const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

      try {
        // Send GET request to fetch character data
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
          params: {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
          }
        });
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError(error); //error state if the request fails
      }
    };

    fetchCharacters();
  }, []);

   // Render error message if there is an error

  if (error) {
    return <div>Error loading characters: {error.message}</div>;
  }

  return (
    <div className="character-list">
      {characters.map(character => (
        <div key={character.id} onClick={() => onSelectCharacter(character.id)} style={{ cursor: 'pointer' }}>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
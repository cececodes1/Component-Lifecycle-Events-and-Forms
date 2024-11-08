import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MD5 from 'crypto-js/md5';

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

    // Fetch character details whenever the characterId change
  useEffect(() => {
    const fetchCharacterDetail = async () => {
      const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
      const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const ts = Date.now().toString();
      const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}`, {
          params: {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
          }
        });
        // Update state with fetched character details
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setError(error);
      }
    };

      // Render loading message while character details are being fetched
    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]);

  if (error) {
    return <div>Error loading character details: {error.message}</div>;
  }

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p>{character.description || "No description available."}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.length > 0 ? (
          character.comics.items.map((comic, index) => (
            <li key={index }>
              {comic.name}
            </li>
          ))
        ) : (
          <li>No comics available for this character.</li>
        )}
      </ul>
    </div>
  );
};

export default CharacterDetail;
import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleSelectCharacter = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <div className="app">
      <h1>Marvel Comics Characters</h1>
      <CharacterList onSelectCharacter={handleSelectCharacter} />
      {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
    </div>
  );
};

export default App;
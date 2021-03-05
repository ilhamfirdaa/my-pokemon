import React, { useState, createContext } from 'react';

const MyPokemonContext = createContext();

function MyPokemonProvider({ children }) {
  const [Pokedex, setPokedex] = useState([]);

  return (
    <MyPokemonContext.Provider value={[Pokedex, setPokedex]}>
      {children}
    </MyPokemonContext.Provider>
  );
}

export { MyPokemonContext, MyPokemonProvider };

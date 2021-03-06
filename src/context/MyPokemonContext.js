import React, { useState, createContext, useEffect } from 'react';

const MyPokemonContext = createContext();

function MyPokemonProvider({ children }) {
  const [Pokedex, setPokedex] = useState(
    () => JSON.parse(localStorage.getItem('pokedex')) || [],
  );

  useEffect(() => {
    localStorage.setItem('pokedex', JSON.stringify(Pokedex));
  }, ['pokedex', Pokedex]);

  return (
    <MyPokemonContext.Provider value={[Pokedex, setPokedex]}>
      {children}
    </MyPokemonContext.Provider>
  );
}

export { MyPokemonContext, MyPokemonProvider };

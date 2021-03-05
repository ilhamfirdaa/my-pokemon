import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import MyPokemonList from './pages/MyPokemonList';

import './App.css';

function App() {
  return (
    <Switch>
      <Route component={PokemonList} />
      <Route component={PokemonDetail} />
      <Route component={MyPokemonList} />
    </Switch>
  );
}

export default App;

import { Route, Switch } from 'react-router-dom';

import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import MyPokemonList from './pages/MyPokemonList';

import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={PokemonList} />
        <Route path="/pokemon/:name" component={PokemonDetail} />
        <Route path="/my-pokemon" component={MyPokemonList} />
      </Switch>

    </>
  );
}

export default App;

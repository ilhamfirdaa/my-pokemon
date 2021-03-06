import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import MyPokemonList from './pages/MyPokemonList';
import MyPokemonDetail from './pages/MyPokemonDetail';

import './App.css';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route path="/pokemon/:name" component={PokemonDetail} />
          <Route exact path="/my-pokemon" component={MyPokemonList} />
          <Route path="/my-pokemon/:nickname" component={MyPokemonDetail} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;

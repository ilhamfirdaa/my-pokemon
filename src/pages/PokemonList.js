/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';

import { MyPokemonContext } from '../context/MyPokemonContext';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const listPokemon = css`
  display: flex;
  align-items: center;
  color: white;
  background-color: #ddd;
  margin: 4px;
  width: 100%;
  cursor: pointer;
`;

const container = css`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`;

const loadingContainer = css`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const PokemonList = () => {
  const [Pokedex, setPokedex] = useContext(MyPokemonContext);
  const gqlVariables = {
    limit: 0,
    offset: 1,
  };

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) {
    return (
      <div css={css`${loadingContainer}`}>
        <span>
          Loading...
        </span>
      </div>
    );
  }

  if (error) return `Error! ${error.message}`;

  const { results } = data.pokemons;

  const handleClick = ({ name, image, url }) => {
    const isHave = Pokedex.find((val) => val.name === name);

    if (isHave) {
      const pokeIndex = Pokedex.findIndex((val) => val.name === name);
      const items = [...Pokedex];
      const item = { ...items[pokeIndex] };
      item.count += 1;
      items[pokeIndex] = item;
      setPokedex(items);
    } else {
      setPokedex((prevPokedex) => [...prevPokedex, {
        name,
        image,
        url,
        count: 1,
      }]);
    }
  };

  return (
    <div css={css`${container}`}>
      {results.map((item) => (
        <div
          key={item.name}
          css={css`${listPokemon}`}
        >
          <img src={item.image} alt={item.name} />
          <span>
            { item.name }
          </span>
          <button type="button" onClick={() => handleClick(item)}>
            Catch
          </button>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;

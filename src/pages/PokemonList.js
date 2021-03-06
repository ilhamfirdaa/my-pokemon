/** @jsx jsx */
/** @jsxRuntime classic */
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';
import { useState } from 'react';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        image
        name
        url
      }
    }
  }
`;

const loadingContainer = css`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #181B1D;

  img {
    width: 100vw;
  }
`;

const listPokemon = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin: 4px;
  width: 100%;
  padding: 16px;

  img {
    margin-bottom: 0.5rem;
  }

  &:hover {
    animation: bounce 0.5s linear;
    cursor: pointer;
  }
`;

const container = css`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`;

const PokemonList = ({ history }) => {
  const [limit, setLimit] = useState(10);

  const handleClickDetail = (name) => {
    history.push({
      pathname: `/pokemon/${name}`,
      state: name,
    });
  };

  const {
    loading, error, data, networkStatus,
  } = useQuery(GET_POKEMONS, {
    variables: {
      limit,
      offset: 0,
    },
  });

  const handleLoadMore = () => {
    setLimit(limit + 10);
  };
  console.log(networkStatus);
  if (loading) {
    return (
      <div css={css`${loadingContainer}`}>
        <img src="https://pokeres.bastionbot.org/pokeball.gif" alt="loading" />
      </div>
    );
  }

  if (error) return `Error! ${error.message}`;

  const { results } = data.pokemons;

  return (
    <div css={css`${container}`}>
      {results.map((item) => (
        <div
          key={item.name}
          role="link"
          css={css`${listPokemon}`}
          onClick={() => handleClickDetail(item.name)}
        >
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`}
            alt={item.name}
            css={css`
              width: 6rem;
            `}
          />
          <span>
            { item.name }
          </span>
        </div>
      ))}

      {networkStatus === NetworkStatus.refetch
        && (
          <h1 style={{ color: 'white' }}>
            Refetching
          </h1>
        )}

      <button type="button" onClick={() => handleLoadMore()}>
        Load More
      </button>
    </div>
  );
};

export default PokemonList;

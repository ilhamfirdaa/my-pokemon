/** @jsx jsx */
/** @jsxRuntime classic */
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      message
      results {
        id
        image
        name
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

const loadingAnimation = css`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  :after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }

  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`;

const listPokemon = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin: 4px;
  width: 100%;
  padding: 8px;

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
    loading, error, data,
  } = useQuery(GET_POKEMONS, {
    variables: {
      limit,
      offset: 0,
    },
  });

  const handleLoadMore = () => {
    setLimit(limit + 10);
  };

  if (loading) {
    return (
      <div css={css`${loadingContainer}`}>
        <div css={[loadingAnimation]} />
      </div>
    );
  }

  if (error) return `Error! ${error.message}`;

  const { results } = data.pokemons;

  return (
    <div css={css`${container}`}>
      {results.map((item) => (
        <div
          key={item.id}
          role="link"
          css={css`${listPokemon}`}
          onClick={() => handleClickDetail(item.name)}
        >
          <img
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
          />
          <span>
            { item.name }
          </span>
        </div>
      ))}

      <button type="button" onClick={() => handleLoadMore()}>
        Load More
      </button>
    </div>
  );
};

export default PokemonList;

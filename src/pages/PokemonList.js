/** @jsx jsx */
/** @jsxRuntime classic */
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';

// components
import Skeleton from '../components/Skeleton';

// styles
import {
  container, subContainer, listPokemon, btnLoadMore,
} from '../styles/global';

// queries
import { GET_POKEMONS } from '../services/graphql/query';
import Loader from '../components/Loader';

const PokemonList = ({ history }) => {
  document.title = 'Pokemon | Ilham Firdaus';
  const [limit, setLimit] = useState(16);
  const [listPoke, setListPoke] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleClickDetail = (name) => {
    history.push({
      pathname: `/pokemon/${name}`,
      state: name,
    });
  };

  const {
    loading, data,
  } = useQuery(GET_POKEMONS, {
    variables: {
      limit,
      offset: 0,
    },
  });

  const handleLoadMore = () => {
    setLimit(limit + 8);
  };

  useEffect(() => {
    if (!loading) {
      setListPoke(data.pokemons.results);
      setIsFirstLoad(false);
    }
  }, [data]);

  if (isFirstLoad && loading) {
    return <Loader />;
  }

  return (
    <div css={css`${container}`}>

      <div css={css`${subContainer}`}>
        {listPoke.map((item) => (
          <div
            key={item.id}
            role="link"
            css={css`${listPokemon}`}
            onClick={() => handleClickDetail(item.name)}
          >
            <img
              src={item.image}
              alt={item.name}
              width="80"
              height="80"
            />
            <span>
              { item.name }
            </span>
          </div>
        ))}
        {loading && <Skeleton />}
      </div>

      <div css={css`
          display: flex;
          justify-content: center;
          width: 100%;
        `}
      >
        <button
          type="button"
          css={css`
            ${btnLoadMore}
            margin-bottom: 64px;
          `}
          onClick={() => handleLoadMore()}
        >
          Load More
        </button>
      </div>

    </div>
  );
};

export default PokemonList;

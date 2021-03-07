/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';

// contexts
import { MyPokemonContext } from '../context/MyPokemonContext';

// styles
import {
  container, loadingContainer, subDetailContainer,
  infoContainer, moveContainer, btnLoadMore, loadingAnimation,
} from '../styles/global';

const PokemonDetail = ({ location }) => {
  const history = useHistory();
  const titleName = location.state[0].toUpperCase() + location.state.slice(1);
  document.title = `${titleName} | Ilham Firdaus`;

  const [Pokedex, setPokedex] = useContext(MyPokemonContext);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const detailPokemon = Pokedex.find((val) => val.nickname === location.state);
  const {
    name, nickname, height, weight, image, abilities,
    moves, types, capturedAt,
  } = detailPokemon;

  const handleClickRelease = (value) => {
    const pokeNickname = value[0].toUpperCase() + value.slice(1);
    Swal.fire({
      title: `Do you want to release ${pokeNickname}?`,
      showCancelButton: true,
      confirmButtonText: 'Release',
    }).then((result) => {
      if (result.isConfirmed) {
        const temp = Pokedex.filter((val) => val.nickname !== value);
        Swal.fire(`${pokeNickname} was released!`, '', 'success');
        history.push('/my-pokemon');
        setPokedex(temp);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFirstLoad(false);
    }, 1000);
  }, []);

  if (isFirstLoad) {
    return (
      <div css={css`${loadingContainer}`}>
        <div css={[loadingAnimation]} />
      </div>
    );
  }

  return (
    <div css={css`${container}`}>
      <Header />

      <div css={css`${subDetailContainer}`}>
        <img
          src={image}
          alt={nickname}
        />
        <h3>
          { `${nickname} (${name})` }
        </h3>
        <span>
          {`Captured at: ${capturedAt}`}
        </span>

        <div css={css`${infoContainer}`}>
          <div>
            <span>
              {`${weight / 10}kg`}
            </span>
            <br />
            <span>
              WEIGHT
            </span>
          </div>

          <div>
            {types.map((el, index) => (
              <span key={el.type.name}>
                {`${el.type.name}`}
                {(index + 1) !== types.length && '/'}
              </span>
            ))}
          </div>

          <div>
            <span>
              {`${height / 10}m`}
            </span>
            <br />
            <span>
              HEIGHT
            </span>
          </div>
        </div>

        <hr style={{ width: '100%' }} />

        <span style={{
          margin: '16px 0',
          fontWeight: 'bold',
          color: '#656769',
        }}
        >
          Abilities
        </span>

        <div css={css`${moveContainer}`}>
          {abilities.slice(0, 5).map((el, index) => (
            <span key={el.ability.name}>
              {`${el.ability.name[0].toUpperCase() + el.ability.name.slice(1)}`}
              {(index + 1) !== abilities.slice(0, 5).length && <span>{' \u2022 '}</span>}
            </span>
          ))}
        </div>

        <hr style={{ width: '100%' }} />

        <span style={{
          margin: '16px 0',
          fontWeight: 'bold',
          color: '#656769',
        }}
        >
          Moves
        </span>

        <div css={css`${moveContainer}`}>
          {moves.slice(0, 5).map((el, index) => (
            <span key={el.move.name}>
              {`${el.move.name[0].toUpperCase() + el.move.name.slice(1)}`}
              {(index + 1) !== moves.slice(0, 5).length && <span>{' \u2022 '}</span>}
            </span>
          ))}
        </div>

        <button
          type="button"
          css={css`
            ${btnLoadMore}
            margin-bottom: 56px;
          `}
          onClick={() => handleClickRelease(nickname)}
        >
          Release
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PokemonDetail;

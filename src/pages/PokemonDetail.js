/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
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
  infoContainer, moveContainer, btnLoadMore, btnLoader, loadingAnimation,
} from '../styles/global';

// queries
import { GET_POKEMON_DETAIL } from '../services/graphql/query';

const PokemonDetail = ({ location }) => {
  const history = useHistory();
  const titleName = location.state[0].toUpperCase() + location.state.slice(1);
  document.title = `${titleName} | Ilham Firdaus`;

  const [Pokedex, setPokedex] = useContext(MyPokemonContext);
  const [isCatching, setIsCatching] = useState(false);

  const gqlVariables = {
    name: location.state,
  };

  const { loading, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: gqlVariables,
  });

  const handleClickCatch = (catchedPoke) => {
    setIsCatching(true);
    setTimeout(() => {
      setIsCatching(false);

      const pokeName = catchedPoke.name[0].toUpperCase() + catchedPoke.name.slice(1);
      // catch probability success if > 50%
      if (Math.random() > 50 / 100) {
        Swal.fire({
          title: `${pokeName} was caught!`,
          text: 'Please give pokemon a nickname',
          input: 'text',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Save',
          inputAttributes: {
            autocapitalize: 'on',
          },
          inputValidator: (value) => {
            const isRegistered = Pokedex.find((val) => val.nickname === value);
            const pokeNickname = value[0]?.toUpperCase() + value?.slice(1);
            if (!value) {
              return 'You need to give a nickname!';
            } if (isRegistered) {
              return `${pokeNickname} already exits, give another nickname`;
            }
            return '';
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const pokeNickname = result.value[0].toUpperCase() + result.value.slice(1);
            setPokedex((prevPokedex) => [...prevPokedex, {
              ...data.pokemon,
              nickname: result.value,
              image: catchedPoke.sprites.front_default,
              capturedAt: new Date().toDateString(),
            }]);

            Swal.fire({
              title: `${pokeNickname} has been added to your Pokedex`,
              showCancelButton: true,
              confirmButtonText: 'Look your pokemon',
              cancelButtonText: 'Ok',
            }).then((res) => {
              if (res.isConfirmed) {
                history.push('/my-pokemon');
              }
            });
          }
        });
      } else {
        Swal.fire(
          'Failed',
          `${pokeName} runaway`,
          'error',
        );
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div css={css`${loadingContainer}`}>
        <div css={css`${loadingAnimation}`} />
      </div>
    );
  }

  const {
    name, height, weight, sprites, abilities, moves, types,
  } = data.pokemon;

  return (
    <div css={css`${container}`}>
      <Header />

      <div css={css`${subDetailContainer}`}>
        <img
          src={sprites.front_default}
          alt={name}
        />
        <h3>
          { name }
        </h3>

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
          disabled={isCatching}
          onClick={() => handleClickCatch(data.pokemon)}
        >
          {isCatching ? (
            <div css={css`${btnLoader}`}>
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : 'Catch'}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PokemonDetail;

/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';
import Swal from 'sweetalert2';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';

// context
import { MyPokemonContext } from '../context/MyPokemonContext';

// style
import {
  container, loadingContainer, subDetailContainer,
  infoContainer, moveContainer, btnLoadMore, btnLoader, loadingAnimation,
} from '../style/global';

// query
const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      name
      height
      weight
      moves {
        move {
          name
          url
        }
      }
      sprites {
        front_default
      }
      types {
        type {
          name
        }
      }
      message
    }
  }
`;

const PokemonDetail = ({ location }) => {
  const titleName = location.state[0].toUpperCase() + location.state.slice(1);
  document.title = `${titleName} | Ilham Firdaus`;

  const [Pokedex, setPokedex] = useContext(MyPokemonContext);
  const [isCatching, setIsCatching] = useState(false);

  const gqlVariables = {
    name: location.state,
  };

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: gqlVariables,
  });

  const handleClickCatch = (name, pokeImage) => {
    setIsCatching(true);
    setTimeout(() => {
      setIsCatching(false);

      const pokeName = name[0].toUpperCase() + name.slice(1);
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
              name,
              nickname: result.value,
              image: pokeImage,
            }]);

            Swal.fire(
              'Success',
              `${pokeNickname} has been added to your Pokedex`,
              'success',
            );
          }
        });
      } else {
        Swal.fire(
          'Failed',
          `${pokeName} runaway`,
          'error',
        );
      }
    }, 3000);
  };

  if (loading) {
    return (
      <div css={css`${loadingContainer}`}>
        <div css={css`${loadingAnimation}`} />
      </div>
    );
  }

  if (error) return `Error! ${error.message}`;

  const {
    name, height, weight, sprites, types, moves,
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
          css={css`${btnLoadMore}`}
          disabled={isCatching}
          onClick={() => handleClickCatch(name, sprites.front_default)}
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

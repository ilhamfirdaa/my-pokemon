/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';
import Swal from 'sweetalert2';

import { MyPokemonContext } from '../context/MyPokemonContext';

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

const container = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 100vh;

  img {
    width: 60%;
  }
`;

const infoContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const PokemonDetail = ({ location }) => {
  const [Pokedex, setPokedex] = useContext(MyPokemonContext);

  const gqlVariables = {
    name: location.state,
  };

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: gqlVariables,
  });

  const handleClickCatch = (name, pokeImage) => {
    // catch probability success if > 50%
    if (Math.random() > 50 / 100) {
      Swal.fire({
        title: `${name} was caught!`,
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
          if (!value) {
            return 'You need to give a nickname!';
          } if (isRegistered) {
            return `${value} already exits, give another nickname`;
          }
          return '';
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setPokedex((prevPokedex) => [...prevPokedex, {
            name,
            nickname: result.value,
            image: pokeImage,
          }]);

          Swal.fire(
            'Success',
            `${result.value} has been added to your Pokedex`,
            'success',
          );
        }
      });
    } else {
      Swal.fire(
        'Failed',
        `${name} escape`,
        'error',
      );
    }
  };

  if (loading) {
    return (
      <div css={css`${loadingContainer}`}>
        <div css={[loadingAnimation]} />
      </div>
    );
  }

  if (error) return `Error! ${error.message}`;

  const {
    name, height, weight, sprites, types,
  } = data.pokemon;

  return (
    <div css={css`${container}`}>
      <img
        src={sprites.front_default}
        alt={name}
      />
      <h3>
        { name }
      </h3>

      <div css={css`${infoContainer}`}>
        <span style={{ marginRight: '4px' }}>
          {`Weight: ${weight / 10} kg`}
        </span>
        <span style={{ marginRight: '4px' }}>
          {`Height: ${height / 10} m`}
        </span>

        <div>
          {'Type: '}
          {types.map((el) => (
            <span>
              {`${el.type.name} `}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleClickCatch(name, sprites.front_default)}
      >
        Catch
      </button>
    </div>
  );
};

export default PokemonDetail;

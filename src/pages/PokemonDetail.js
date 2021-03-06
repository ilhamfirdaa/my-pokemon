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
      id
      name
      height
      weight
      moves {
        move {
          name
          url
        }
      }
      types {
        type {
          name
          url
        }
      }
      message
      status
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

const container = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 100vh;

  img {
    width: 70%;
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
        <img src="https://pokeres.bastionbot.org/pokeball.gif" alt="loading" />
      </div>
    );
  }

  if (error) return `Error! ${error.message}`;

  const {
    id, name, weight, height, types,
  } = data.pokemon;
  const pokeImage = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  return (
    <div css={css`${container}`}>
      <img
        src={pokeImage}
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

      <button type="button" onClick={() => handleClickCatch(name, pokeImage)}>
        Catch
      </button>
    </div>
  );
};

export default PokemonDetail;

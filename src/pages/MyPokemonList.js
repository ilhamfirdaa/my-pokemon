/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext } from 'react';
import { jsx, css } from '@emotion/react';
import Swal from 'sweetalert2';

import { MyPokemonContext } from '../context/MyPokemonContext';

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

const PokemonList = () => {
  const [Pokedex, setPokedex] = useContext(MyPokemonContext);

  const handleClickRelease = (nickname) => {
    Swal.fire({
      title: `Do you want to release ${nickname} ?`,
      showCancelButton: true,
      confirmButtonText: 'Release',
    }).then((result) => {
      if (result.isConfirmed) {
        const temp = Pokedex.filter((val) => val.nickname !== nickname);
        setPokedex(temp);
        Swal.fire(`${nickname}was released!`, '', 'success');
      }
    });
  };

  return (
    <div css={css`${container}`}>
      {Pokedex.map((item) => (
        <div
          key={item.name}
          role="link"
          css={css`${listPokemon}`}
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
          <span>
            { item.nickname }
          </span>

          <button
            type="button"
            onClick={() => handleClickRelease(item.nickname)}
          >
            Release
          </button>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;

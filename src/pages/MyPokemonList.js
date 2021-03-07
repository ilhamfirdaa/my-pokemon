/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/react';
import Swal from 'sweetalert2';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';

// context
import { MyPokemonContext } from '../context/MyPokemonContext';

// style
import {
  container, subContainer, listPokemon, loadingContainer, loadingAnimation, btnLoadMore,
} from '../style/global';

const MyPokemonList = () => {
  document.title = 'My Pokemon | Ilham Firdaus';
  const [Pokedex, setPokedex] = useContext(MyPokemonContext);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleClickRelease = (nickname) => {
    const pokeNickname = nickname[0].toUpperCase() + nickname.slice(1);
    Swal.fire({
      title: `Do you want to release ${pokeNickname}?`,
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

  useEffect(() => {
    setIsFirstLoad(false);
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

      <div css={css`
          ${subContainer}
          margin-bottom: 64px;
        `}
      >
        {Pokedex.map((item) => (
          <div
            key={item.nickname}
            role="link"
            css={css`${listPokemon}`}
          >
            <img
              src={item.image}
              alt={item.nickname}
              width={80}
              height={80}
            />
            <span>
              { item.nickname }
            </span>

            <button
              type="button"
              css={css`${btnLoadMore}`}
              onClick={() => handleClickRelease(item.nickname)}
            >
              Release
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default MyPokemonList;

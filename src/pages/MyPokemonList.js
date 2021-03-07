/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/react';
import Swal from 'sweetalert2';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';

// contexts
import { MyPokemonContext } from '../context/MyPokemonContext';

// styles
import {
  container, subContainer, listPokedex, loadingContainer, loadingAnimation,
  btnLoadMore, emptyPokedex,
} from '../styles/global';

const MyPokemonList = ({ history }) => {
  document.title = 'My Pokemon | Ilham Firdaus';
  const [Pokedex, setPokedex] = useContext(MyPokemonContext);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleClickRelease = (e, nickname) => {
    e.stopPropagation();
    const pokeNickname = nickname[0].toUpperCase() + nickname.slice(1);
    Swal.fire({
      title: `Do you want to release ${pokeNickname}?`,
      showCancelButton: true,
      confirmButtonText: 'Release',
    }).then((result) => {
      if (result.isConfirmed) {
        const temp = Pokedex.filter((val) => val.nickname !== nickname);
        setPokedex(temp);
        Swal.fire(`${nickname} was released!`, '', 'success');
      }
    });
  };

  const handleClickDetail = (e, nickname) => {
    e.stopPropagation();
    history.push({
      pathname: `/my-pokemon/${nickname}`,
      state: nickname,
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

      <div css={css`
          ${subContainer}
          margin-bottom: 64px;
        `}
      >
        {Pokedex.length > 0
          ? Pokedex.map((item) => (
            <div
              key={item.nickname}
              role="link"
              css={css`${listPokedex}`}
              onClick={(e) => handleClickDetail(e, item.nickname)}
            >
              <img
                src={item.image}
                alt={item.nickname}
                width="80"
                height="80"
              />
              <span style={{ fontSize: '14px' }}>
                { item.name }
              </span>
              <span style={{ fontWeight: '500' }}>
                { item.nickname }
              </span>

              <button
                type="button"
                css={css`${btnLoadMore}`}
                onClick={(e) => handleClickRelease(e, item.nickname)}
              >
                Release
              </button>
            </div>
          ))
          : (
            <div css={css`
              ${emptyPokedex}
                margin: 64px 0;
              `}
            >
              <img
                src="/pikachu.png"
                alt="pikachu"
                height="auto"
                width="100"
              />
              <span style={{ marginTop: '8px' }}>
                You dont have any pokemon
              </span>
              <a href="/">
                <button
                  type="button"
                  css={css`
                  ${btnLoadMore}
                  margin-bottom: 64px;
                `}
                >
                  Lets get one
                </button>
              </a>
            </div>
          )}
      </div>

      <Footer />
    </div>
  );
};

export default MyPokemonList;

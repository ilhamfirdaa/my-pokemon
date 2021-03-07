/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { header } from '../styles/global';

const Header = () => (
  <div css={css`${header}`}>
    <a href="/">
      <img
        src="/pokemon.png"
        alt="logo"
        height="40"
        width="auto"
      />
    </a>
  </div>
);

export default Header;

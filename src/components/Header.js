/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { header } from '../style/global';

const Header = () => (
  <div css={css`${header}`}>
    <a href="/">
      <img
        src="/pokemon.png"
        alt="logo"
        height={40}
      />
    </a>
  </div>
);

export default Header;

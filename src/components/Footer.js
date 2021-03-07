/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { footer, pokeball } from '../style/global';

const Footer = () => (
  <div css={css`${footer}`}>
    <a href="/my-pokemon">
      <div css={css`${pokeball}`} />
    </a>
  </div>
);

export default Footer;

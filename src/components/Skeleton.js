/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import {
  skeletonCard, skeletonCardImage, skeletonCardTitle, skeletonAnimate,
} from '../styles/global';

const Skeleton = () => {
  const element = [];
  for (let i = 0; i < 8; i++) {
    element.push(
      (
        <div key={i} css={css`${skeletonCard}`}>
          <div css={css`${skeletonCardImage} ${skeletonAnimate}`} />
          <div css={css`${skeletonCardTitle} ${skeletonAnimate}`} />
        </div>
      ),
    );
  }
  return element;
};

export default Skeleton;

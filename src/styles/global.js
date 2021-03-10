import { css } from '@emotion/react';

const bluePrimary = '#07a1bc';

export const header = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100vw;
  height: 60px;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
  z-index: 100;
`;

export const footer = css`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 60px;
  background-color: white;
  box-shadow: rgb(108 114 124 / 16%) 0px -2px 4px 0px;
  z-index: 100;
`;

export const container = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
`;

export const subContainer = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1024px;
  justify-content: center;
  margin-top: 56px;
`;

export const subDetailContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  justify-content: center;
  align-items: center;
  margin-top: 56px;

  img {
    width: 60%;
  }

  @media only screen and (min-width: 576px) {
    width: 50%;
  }
  @media only screen and (min-width: 768px) {
    width: 40%;
  }
  @media only screen and (min-width: 992px) {
    width: 30%;
  }
  
  h3, span {
    text-transform: capitalize;
  }
`;

export const moveContainer = css`
  padding: 8px 0;

  span {
    color: #656769;
  }
`;

export const infoContainer = css`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px 0;

  div {
    flex-grow: 1;
    text-align: center;
    
    span:last-child {
      font-size: 10px;
      font-weight: bold;
      color: #a1a4a6;
    }

    span:first-of-type {
      font-size: 16px;
      font-weight: bold;
      color: #656769;
    }
  }

  div:first-of-type {
    border-right: 1px solid #a1a4a6;
  }
  div:last-child {
    border-left: 1px solid #a1a4a6;
  }
`;

export const emptyPokedex = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const listPokemon = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin: 4px;
  padding: 8px;
  width: calc(100%/2.5);
  border-radius: 9px;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;

  &:hover {
    font-weight: 500;
    color: ${bluePrimary};
    border: 2px solid ${bluePrimary};
    padding: 6px;
    cursor: pointer;
  }

  @media only screen and (min-width: 768px) {
    width: calc(100%/5);
  }
  @media only screen and (min-width: 992px) {
    width: calc(100%/10);
  }

  span {
    text-transform: capitalize;
  }
`;

export const listPokedex = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin: 4px;
  padding: 8px;
  width: calc(100%/2.5);
  border-radius: 9px;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;

  &:hover {
    border: 2px solid ${bluePrimary};
    padding: 6px;
    cursor: pointer;
  }

  @media only screen and (min-width: 768px) {
    width: calc(100%/5);
  }
  @media only screen and (min-width: 992px) {
    width: calc(100%/10);
  }

  span {
    text-transform: capitalize;
  }
`;

export const btnLoadMore = css`
  color: rgba(49, 53, 59, 0.68);
  font-size: 14px;
  height: 40px;
  line-height: 18px;
  width: 100%;
  max-width: 375px;
  border-radius: 8px;
  font-weight: 700;
  outline: none;
  overflow: hidden;
  margin-top: 16px;
  padding: 0px 16px;
  position: relative;
  text-overflow: ellipsis;
  transition: background 0.8s ease 0s;
  white-space: nowrap;
  display: block;
  background: radial-gradient(circle, transparent 1%, rgb(255, 255, 255) 1%) center center / 15000% rgb(255, 255, 255);
  border: 1px solid rgb(159, 166, 176);
  text-indent: initial;
  text-decoration: none;
  
  &:hover {
    color: ${bluePrimary};
    border: 2px solid ${bluePrimary};
    cursor: pointer;
  }
  
  &:disabled {
    color: rgba(49, 53, 59, 0.68);
    border: 1px solid rgb(159, 166, 176);
    cursor: not-allowed;
  }
`;

export const skeletonCard = css`
  background-color: #fff; 
  height: 120px;
  width: calc(100%/2.5);
  overflow: hidden; 
  margin: 12px; 
  border-radius: 5px; 
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;

  @media only screen and (min-width: 768px) {
    width: calc(100%/5);
  }
  @media only screen and (min-width: 992px) {
    width: calc(100%/10);
  }
`;

export const skeletonCardTitle = css`
  height: 1rem;
  width: 80%;
  margin: 0.75rem; 
  border-radius: 3px;
`;

export const skeletonCardImage = css`
  width: 100%; 
  height: 70%;
`;

export const skeletonAnimate = css`
  position: relative;
  background-color: #e2e2e2;

  :after { 
    display: block; 
    content: ""; 
    position: absolute; 
    width: 100%; 
    height: 100%;
    transform: translateX(-100%); 
    background: -webkit-gradient(linear, left top, 
                right top, from(transparent),  
                color-stop(rgba(255, 255, 255, 0.2)), 
                to(transparent)); 
                  
    background: linear-gradient(90deg, transparent, 
            rgba(255, 255, 255, 0.2), transparent); 

    /* Adding animation */ 
    animation: loading 0.8s infinite; 
  } 

  /* Loading Animation */ 
  @keyframes loading { 
    100% { 
        transform: translateX(100%); 
    } 
  }
`;

export const pokeball = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #70757A;
  cursor: pointer;
  background: white;
  box-shadow: -4px 0 rgba(0, 0, 0, 0.1) inset;
  background: linear-gradient(
    to bottom,
    #e83e35 0%,
    #e83e35 50.5%,
    #ffffff 50.51%,
    #ffffff 100%
  );

  :before {
    content: "";
    position: absolute;
    top: 14px;
    left: 14px;
    width: 8px;
    height: 8px;
    border: solid 2px #3f3f3f;
    border-radius: 50%;
    background: white;
    z-index: 1;
  }
`;

export const btnLoader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgb(159, 166, 176);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(159, 166, 176) transparent transparent transparent;
  }

  div:nth-of-type(1) {
    animation-delay: -0.45s;
  }

  div:nth-of-type(2) {
    animation-delay: -0.3s;
  }

  div:nth-of-type(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

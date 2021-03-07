import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        id
        image
        name
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      name
      height
      weight
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
          url
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

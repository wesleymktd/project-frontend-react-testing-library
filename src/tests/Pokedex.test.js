import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

function setIsPokemonFavoriteById() {
  const isPokemonFavorite = pokemonList.reduce((acc, pokemon) => {
    acc[pokemon.id] = true;
    return acc;
  }, {});

  return isPokemonFavorite;
}

describe('Testa o Component Pokedex...', () => {
  it('Testa se página contém um heading h2 com o texto Econtered Pokemon', () => {
    // const favoritePokemon = pokemonList.filter(({ id }) => isPokemonFavoriteById[id]);
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ setIsPokemonFavoriteById() }
    />);
    // acessar
    const textEl = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(textEl).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo pokemon da lista quando o botão "proximo pokemon" é clicado', () => {
    // const favoritePokemon = pokemonList.filter(({ id }) => isPokemonFavoriteById[id]);
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ setIsPokemonFavoriteById() }
    />);
    // acessar
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();

    // interagir
    userEvent.click(buttonNext);
    const namePok = screen.getByText(/charmander/i);
    expect(namePok).toBeInTheDocument();
  });

  it('Testa se os proximos pokemons são mostrados um a um', () => {
    // const favoritePokemon = pokemonList.filter(({ id }) => isPokemonFavoriteById[id]);
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ setIsPokemonFavoriteById() }
    />);
    // acessar
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    // expect(buttonNext).toBeInTheDocument();
    // interagir
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);

    const namePok = screen.getByText(/dragonair/i);
    userEvent.click(buttonNext);
    expect(namePok).toHaveTextContent('Pikachu');
  });

  it('Testa se a pokedex tem os botões de filtro', () => {
    // const favoritePokemon = pokemonList.filter(({ id }) => isPokemonFavoriteById[id]);
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ setIsPokemonFavoriteById() }
    />);
    // acessar
    const allButtons = screen.getByRole('button', { name: /all/i });
    expect(allButtons).toBeInTheDocument();

    const quantBtn = 7;
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    expect(buttonTypes).toHaveLength(quantBtn);

    const btnEletric = buttonTypes[0];
    const typePower = 'Electric';
    expect(btnEletric).toHaveTextContent(typePower);

    userEvent.click(btnEletric);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(typePower);
    expect(allButtons).toBeInTheDocument();
  });

  it('teste se a pokedex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ setIsPokemonFavoriteById() }
    />);

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});

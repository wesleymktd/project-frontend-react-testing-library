import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o Component PokedexDetails...', () => {
  it('Testa se as informações detalhadas do pokemon são exibidas na tela', () => {
    renderWithRouter(<App />);

    const linkPok = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkPok);

    const textDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const nameDetails = screen.getByText(/summary/i);
    expect(textDetails).toBeInTheDocument();
    expect(linkPok).not.toBeInTheDocument();
    expect(nameDetails).toHaveTextContent('Summary');

    const sumaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(sumaryText).toBeInTheDocument();
    // const textEl = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    // expect(textEl).toBeInTheDocument();
  });

  it('Testa se existe na tela uma seção com os mapas das localizações dos pokemons', () => {
    renderWithRouter(<App />);

    const linkPok = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkPok);

    const textDetails = screen.getByRole('heading', { name: /Game locations of Pikachu/i });
    expect(textDetails).toBeInTheDocument();

    const sumaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(sumaryText).toBeInTheDocument();

    const imgAll = screen.getAllByAltText('Pikachu location');
    expect(imgAll.length).toBe(2);
  });

  it('Testa se o usuário pode favoritar um pokemon atravése da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkPok = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkPok);

    const textDetails = screen.getByRole('heading', { name: /Game locations of Pikachu/i });
    expect(textDetails).toBeInTheDocument();

    const sumaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(sumaryText).toBeInTheDocument();

    const imgAll = screen.getAllByAltText('Pikachu location');
    expect(imgAll.length).toBe(2);
    expect(imgAll[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgAll[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const checkPokFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkPokFavorite).toBeInTheDocument();
  });
});

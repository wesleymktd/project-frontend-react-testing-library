import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o Component Pokemon...', () => {
  it('Testa se é renderizado um card com as informações de determinado pokemon', () => {
    renderWithRouter(<App />);

    const textName = screen.getByTestId('pokemon-name');
    expect(textName).toHaveTextContent('Pikachu');

    const textType = screen.getByTestId('pokemon-type');
    expect(textType).toHaveTextContent('Electric');

    const textWeight = screen.getByTestId('pokemon-weight');
    expect(textWeight).toHaveTextContent('Average weight: 6.0 kg');

    const imgSrc = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgSrc.alt).toContain('Pikachu sprite');
    expect(imgSrc.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se na Pokedex contém link de navegação. O link deve ter URL /pokemon/<id>', () => {
    renderWithRouter(<App />);
    const linkImg = screen.getByRole('link', { name: /more details/i });
    expect(linkImg.href).toContain('http://localhost/pokemon/25');
  });

  it('Testa se ao clicar no link a página redireciona e se a url muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const linkPok = screen.getByRole('link', { name: /more details/i });

    userEvent.click(linkPok);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  it('Testa se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkPok = screen.getByRole('link', { name: /more details/i });

    userEvent.click(linkPok);

    const checkPokFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkPokFavorite);

    const imgStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imgStar.src).toContain('/star-icon.svg');
    expect(imgStar.alt).toContain('Pikachu is marked as favorite');
  });
});

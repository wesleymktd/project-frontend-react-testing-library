import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o App..', () => {
  it('Topo da aplicação contém conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavoPok = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkFavoPok).toBeInTheDocument();
  });

  it('Teste se redirecina para home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });

    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se redirecina para about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se redirecina para Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoPok = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(linkFavoPok);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste de redirecionamento notFound ao digitar página desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });

    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});

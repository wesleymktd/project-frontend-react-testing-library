import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o App..', () => {
  it('Teste se a página contém h2 com o texto About Pokemon', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const h2Text = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2Text).toBeInTheDocument();
  });

  it('Teste se a página contém uma img', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const imageEl = screen.getByRole('img', {
      src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });
    expect(imageEl).toBeInTheDocument();

    const imageElName = screen.getByRole('img', {
      name: /pokédex/i });
    expect(imageElName).toBeInTheDocument();
    expect(imageEl.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

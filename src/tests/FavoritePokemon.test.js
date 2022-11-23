import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o Component Favorite...', () => {
  it('Topo da aplicação contém conjunto de links de navegação', () => {
    renderWithRouter(<FavoritePokemon />);
    // acessar
    const textEl = screen.getByText(/no favorite pokémon found/i);
    // testar
    expect(textEl).toBeInTheDocument();
  });
});

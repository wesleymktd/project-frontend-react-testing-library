import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o Component NotFound...', () => {
  it('Testa elementos e imagem em tela se existe', () => {
    renderWithRouter(<NotFound />);
    // acessar
    const textEl = screen.getByRole('heading', { name: /page requested not found/i });
    const imageEl = screen.getByRole('img', {
      src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    });
    // testar
    expect(textEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(imageEl.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

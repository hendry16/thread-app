/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register and navigate when form is submitted
 */

import React from 'react';
import { createMemoryHistory } from '@remix-run/router';
import matchers from '@testing-library/jest-dom/matchers';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';
import { register } from '../utils/api';

jest.mock('../utils/api', () => ({
  register: jest.fn(),
}));

expect.extend(matchers);

function renderWithRouter(ui) {
  const history = createMemoryHistory();
  render(<Router location={history.location} navigator={history}>{ui}</Router>);
  return { history };
}

describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    renderWithRouter(<RegisterInput />);

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'Ayu');

    expect(nameInput).toHaveValue('Ayu');
  });

  it('should handle email typing correctly', async () => {
    renderWithRouter(<RegisterInput />);

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'ayu@test.com');

    expect(emailInput).toHaveValue('ayu@test.com');
  });

  it('should call register and navigate when form is submitted', async () => {
    renderWithRouter(<RegisterInput />);

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'secret');

    expect(passwordInput).toHaveValue('secret');
  });

  it('should call register and navigate when form is submitted', async () => {
    const fakeRegister = register;
    register.mockResolvedValueOnce({});

    const { history } = renderWithRouter(<RegisterInput />);

    await userEvent.type(screen.getByPlaceholderText('Name'), 'Ayu');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'ayu@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'secret');

    const button = screen.getByRole('button', { name: 'Daftar' });
    await userEvent.click(button);

    expect(fakeRegister).toHaveBeenCalledWith({
      name: 'Ayu',
      email: 'ayu@test.com',
      password: 'secret',
    });

    expect(history.location.pathname).toBe('/');
  });
});

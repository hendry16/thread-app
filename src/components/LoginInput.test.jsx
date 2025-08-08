/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    render(
      <BrowserRouter>
        <LoginInput login={() => {}} />
      </BrowserRouter>,
    );

    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'test@test.com');

    expect(emailInput).toHaveValue('test@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(
      <BrowserRouter>
        <LoginInput login={() => {}} />
      </BrowserRouter>,
    );

    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'secret');

    expect(passwordInput).toHaveValue('secret');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = jest.fn();
    render(
      <BrowserRouter>
        <LoginInput login={mockLogin} />
      </BrowserRouter>,
    );

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@test.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'secret');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'secret',
    });
  });
});

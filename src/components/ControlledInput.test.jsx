/*
 * scenario test
 *
 * - ControlledInput component
 *   - should render input with correct type, placeholder, and value
 *   - should call onChange when user types
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import ControlledInput from './ControlledInput';

expect.extend(matchers);

describe('ControlledInput component', () => {
  it('should render input with correct type, placeholder, and value', () => {
    render(
      <ControlledInput
        type="email"
        placeholder="Masukkan email"
        value="ayu@test.com"
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('Masukkan email');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveValue('ayu@test.com');
  });

  it('should call onChange when user types', async () => {
    const handleChange = jest.fn();

    render(
      <ControlledInput
        type="text"
        placeholder="Nama"
        value=""
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText('Nama');

    await userEvent.type(input, 'Ayu');

    expect(handleChange).toHaveBeenCalledTimes('Ayu'.length);
  });
});

/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should update inputs and call addThread on submit
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('ThreadInput component', () => {
  it('should update inputs and call addThread on submit', async () => {
    const mockAddThread = jest.fn();

    render(<ThreadInput addThread={mockAddThread} />);

    const titleInput = screen.getByPlaceholderText('Judul');
    const categoryInput = screen.getByPlaceholderText('Kategori');
    const bodyTextarea = screen.getByPlaceholderText('Tulis isi konten');
    const submitButton = screen.getByRole('button', { name: /tambah/i });

    await userEvent.type(titleInput, 'Judul Diskusi');
    await userEvent.type(categoryInput, 'Kategori A');
    await userEvent.type(bodyTextarea, 'Isi konten diskusi');

    expect(titleInput).toHaveValue('Judul Diskusi');
    expect(categoryInput).toHaveValue('Kategori A');
    expect(bodyTextarea).toHaveValue('Isi konten diskusi');

    await userEvent.click(submitButton);

    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Judul Diskusi',
      category: 'Kategori A',
      body: 'Isi konten diskusi',
    });

    expect(titleInput).toHaveValue('');
    expect(categoryInput).toHaveValue('');
    expect(bodyTextarea).toHaveValue('');
  });
});

/**
 * users thunk test scenarios
 *
 * - asyncRegisterUser thunk
 *   - should call register and dispatch loading actions on success
 *   - should call alert and dispatch loading actions on error
 */

import { register } from '../../utils/api';
import { hideLoading, showLoading } from '../loading/loadingSlice';
import { asyncRegisterUser } from './action';

jest.mock('../../utils/api');
jest.mock('../loading/loadingSlice');

describe('asyncRegisterUser thunk', () => {
  const fakeUser = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'secret',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call register and dispatch loading actions on success', async () => {
    register.mockResolvedValueOnce();

    const dispatch = jest.fn();

    await asyncRegisterUser(fakeUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(register).toHaveBeenCalledWith(fakeUser);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call alert and dispatch loading actions on error', async () => {
    register.mockRejectedValueOnce(new Error('Registration failed'));

    window.alert = jest.fn();
    const dispatch = jest.fn();

    await asyncRegisterUser(fakeUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(register).toHaveBeenCalledWith(fakeUser);
    expect(window.alert).toHaveBeenCalledWith('Registration failed');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

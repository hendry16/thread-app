/*
 * authUser thunks test scenario
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly when login and getOwnProfile succeed
 *   - should dispatch action and call alert correctly and when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch unsetAuthUser and clear token
 */

import {
  getOwnProfile, login, putAccessToken,
} from '../../utils/api';
import { hideLoading, showLoading } from '../loading/loadingSlice';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './asyncAction';

// mock dependencies
jest.mock('../../utils/api');
jest.mock('../loading/loadingSlice');
jest.mock('./action', () => ({
  setAuthUserActionCreator: jest.fn(),
  unsetAuthUserActionCreator: jest.fn(),
}));

describe('authUser thunks', () => {
  const fakeUser = {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  };
  const fakeToken = 'fake-token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('asyncSetAuthUser thunk', () => {
    it('should dispatch action correctly when login and getOwnProfile succeed', async () => {
      login.mockResolvedValue(fakeToken);
      getOwnProfile.mockResolvedValue(fakeUser);
      setAuthUserActionCreator.mockReturnValue({
        type: 'SET_AUTH_USER',
        payload: fakeUser,
      });

      const dispatch = jest.fn();

      await asyncSetAuthUser({ email: 'test@example.com', password: 'secret' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'secret' });
      expect(putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(getOwnProfile).toHaveBeenCalled();
      expect(setAuthUserActionCreator).toHaveBeenCalledWith(fakeUser);
      expect(dispatch).toHaveBeenCalledWith({ type: 'SET_AUTH_USER', payload: fakeUser });
    });

    it('should dispatch action and call alert correctly and when data fetching failed', async () => {
      login.mockRejectedValue(new Error('Login failed'));
      window.alert = jest.fn();

      const dispatch = jest.fn();

      await asyncSetAuthUser({ email: 'wrong', password: 'wrong' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith('Login failed');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch unsetAuthUser and clear token', async () => {
      const dispatch = jest.fn();
      unsetAuthUserActionCreator.mockReturnValue({ type: 'UNSET_AUTH_USER' });

      await asyncUnsetAuthUser()(dispatch);

      expect(unsetAuthUserActionCreator).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({ type: 'UNSET_AUTH_USER' });
    });
  });
});

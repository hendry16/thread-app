import { showLoading, hideLoading } from '../loading/loadingSlice';
import { putAccessToken, getOwnProfile, login } from '../../utils/api';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';

const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const token = await login({ email, password });
    if (!token) return;

    putAccessToken(token);
    const authUser = await getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

const asyncUnsetAuthUser = () => async (dispatch) => {
  dispatch(unsetAuthUserActionCreator());
  putAccessToken('');
};

export { asyncUnsetAuthUser, asyncSetAuthUser };

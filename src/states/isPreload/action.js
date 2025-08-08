import { showLoading, hideLoading } from '../loading/loadingSlice';
import { getOwnProfile } from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const authUser = await getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    dispatch(setAuthUserActionCreator(null));
  } finally {
    dispatch(setIsPreloadActionCreator(false));
  }

  dispatch(hideLoading());
};

export { ActionType, asyncPreloadProcess };

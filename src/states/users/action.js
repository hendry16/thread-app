import { register } from '../../utils/api';
import { hideLoading, showLoading } from '../loading/loadingSlice';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

const asyncRegisterUser = ({ name, email, password }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    await register({ name, email, password });
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};

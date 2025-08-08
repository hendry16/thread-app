import { getAllThreads, getAllUsers } from '../../utils/api';
import { hideLoading, showLoading } from '../loading/loadingSlice';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const users = await getAllUsers();
    const threads = await getAllThreads();

    dispatch(receiveUsersActionCreator(users));
    dispatch(receiveThreadsActionCreator(threads));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export { asyncPopulateUsersAndThreads };

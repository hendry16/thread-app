import { getLeaderboards } from '../../utils/api';
import { hideLoading, showLoading } from '../loading/loadingSlice';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

const asyncReceiveLeaderboards = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const leaderboards = await getLeaderboards();
    dispatch(receiveLeaderboardsActionCreator(leaderboards));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};

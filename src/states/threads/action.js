import {
  downVoteThread,
  neutralVoteThread,
  upVoteThread,
  createThread,
} from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP-VOTE-THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  try {
    const thread = await createThread({ title, body, category });
    dispatch(addThreadActionCreator(thread));
  } catch (error) {
    alert(error.message);
  }
};

const asyncUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser, threads } = getState();
  const userId = authUser.id;
  const thread = threads.find((t) => t.id === threadId);
  const wasUpVoted = thread.upVotesBy.includes(userId);
  const wasDownVoted = thread.downVotesBy.includes(userId);

  if (wasUpVoted) {
    dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
  } else if (wasDownVoted) {
    dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
    dispatch(upVoteThreadActionCreator({ threadId, userId }));
  } else {
    dispatch(upVoteThreadActionCreator({ threadId, userId }));
  }

  try {
    await upVoteThread(threadId);
  } catch (error) {
    alert(error.message);

    if (wasUpVoted) {
      dispatch(upVoteThreadActionCreator({ threadId, userId }));
    } else if (wasDownVoted) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
      dispatch(downVoteThreadActionCreator({ threadId, userId }));
    } else {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
    }
  }
};

const asyncDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser, threads } = getState();
  const userId = authUser.id;
  const thread = threads.find((t) => t.id === threadId);
  const wasUpVoted = thread.upVotesBy.includes(userId);
  const wasDownVoted = thread.downVotesBy.includes(userId);

  if (wasUpVoted) {
    dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
    dispatch(downVoteThreadActionCreator({ threadId, userId }));
  } else if (wasDownVoted) {
    dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
  } else {
    dispatch(downVoteThreadActionCreator({ threadId, userId }));
  }

  try {
    await downVoteThread(threadId);
  } catch (error) {
    alert(error.message);

    if (wasUpVoted) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
      dispatch(upVoteThreadActionCreator({ threadId, userId }));
    } else if (wasDownVoted) {
      dispatch(downVoteThreadActionCreator({ threadId, userId }));
    } else {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
    }
  }
};

const asyncNeutralVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser, threads } = getState();
  const userId = authUser.id;
  const thread = threads.find((t) => t.id === threadId);
  const wasUpVoted = thread.upVotesBy.includes(userId);
  const wasDownVoted = thread.downVotesBy.includes(userId);

  if (wasUpVoted) {
    dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
  } else if (wasDownVoted) {
    dispatch(neutralVoteThreadActionCreator({ threadId, userId }));
  }

  try {
    await neutralVoteThread(threadId);
  } catch (error) {
    alert(error.message);

    if (wasUpVoted) {
      dispatch(upVoteThreadActionCreator({ threadId, userId }));
    } else if (wasDownVoted) {
      dispatch(downVoteThreadActionCreator({ threadId, userId }));
    }
  }
};

export {
  ActionType,
  addThreadActionCreator,
  receiveThreadsActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};

import {
  createComment,
  downVoteThread,
  getThreadDetail,
  upVoteComment,
  upVoteThread,
} from '../../utils/api';
import { hideLoading, showLoading } from '../loading/loadingSlice';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT_THREAD_DETAIL: 'ADD_COMMENT_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      detailThread,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(clearThreadDetailActionCreator());
  dispatch(showLoading());

  try {
    const detailThread = await getThreadDetail(threadId);
    dispatch(receiveThreadDetailActionCreator(detailThread));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

const asyncAddCommentThreadDetail = (threadId, content) => async (dispatch) => {
  try {
    const comment = await createComment(threadId, { content });
    dispatch(addCommentActionCreator(comment));
  } catch (error) {
    alert(error.message);
  }
};

const asyncUpVoteThreadDetail = () => async (dispatch, getState) => {
  const { authUser, detailThread } = getState();

  const wasUpVoted = detailThread.upVotesBy.includes(authUser.id);
  const wasDownVoted = detailThread.downVotesBy.includes(authUser.id);

  if (wasUpVoted) {
    dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
  } else if (wasDownVoted) {
    dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    dispatch(upVoteThreadDetailActionCreator(authUser.id));
  } else {
    dispatch(upVoteThreadDetailActionCreator(authUser.id));
  }

  try {
    await upVoteThread(detailThread.id);
  } catch (error) {
    alert(error.message);

    if (wasUpVoted) {
      dispatch(upVoteThreadDetailActionCreator(authUser.id));
    } else if (wasDownVoted) {
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
      dispatch(downVoteThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    }
  }
};

const asyncDownVoteThreadDetail = () => async (dispatch, getState) => {
  const { authUser, detailThread } = getState();

  const wasUpVoted = detailThread.upVotesBy.includes(authUser.id);
  const wasDownVoted = detailThread.downVotesBy.includes(authUser.id);

  if (wasUpVoted) {
    dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    dispatch(downVoteThreadDetailActionCreator(authUser.id));
  } else if (wasDownVoted) {
    dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
  } else {
    dispatch(downVoteThreadDetailActionCreator(authUser.id));
  }

  try {
    await downVoteThread(detailThread.id);
  } catch (error) {
    alert(error.message);

    if (wasUpVoted) {
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
      dispatch(upVoteThreadDetailActionCreator(authUser.id));
    } else if (wasDownVoted) {
      dispatch(downVoteThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    }
  }
};

const asyncUpVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, detailThread } = getState();
  const userId = authUser.id;

  const comment = detailThread.comments.find((c) => c.id === commentId);
  const wasUpVoted = comment.upVotesBy.includes(userId);
  const wasDownVoted = comment.downVotesBy.includes(userId);

  if (wasUpVoted) {
    dispatch(neutralVoteCommentActionCreator(commentId, userId));
  } else if (wasDownVoted) {
    dispatch(neutralVoteCommentActionCreator(commentId, userId));
    dispatch(upVoteCommentActionCreator(commentId, userId));
  } else {
    dispatch(upVoteCommentActionCreator(commentId, userId));
  }

  try {
    await upVoteComment(detailThread.id, commentId);
  } catch (error) {
    if (wasUpVoted) {
      dispatch(upVoteCommentActionCreator(commentId, userId));
    } else if (wasDownVoted) {
      dispatch(neutralVoteCommentActionCreator(commentId, userId));
      dispatch(downVoteCommentActionCreator(commentId, userId));
    } else {
      dispatch(neutralVoteCommentActionCreator(commentId, userId));
    }
  }
};

const asyncDownVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, detailThread } = getState();
  const userId = authUser.id;

  const comment = detailThread.comments.find((c) => c.id === commentId);
  const wasUpVoted = comment.upVotesBy.includes(userId);
  const wasDownVoted = comment.downVotesBy.includes(userId);

  if (wasUpVoted) {
    dispatch(neutralVoteCommentActionCreator(commentId, userId));
    dispatch(downVoteCommentActionCreator(commentId, userId));
  } else if (wasDownVoted) {
    dispatch(neutralVoteCommentActionCreator(commentId, userId));
  } else {
    dispatch(downVoteCommentActionCreator(commentId, userId));
  }

  try {
    await downVoteThread(detailThread.id, commentId);
  } catch (error) {
    if (wasUpVoted) {
      dispatch(neutralVoteCommentActionCreator(commentId, userId));
      dispatch(upVoteCommentActionCreator(commentId, userId));
    } else if (wasDownVoted) {
      dispatch(downVoteCommentActionCreator(commentId, userId));
    } else {
      dispatch(neutralVoteCommentActionCreator(commentId, userId));
    }
  }
};

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddCommentThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
};

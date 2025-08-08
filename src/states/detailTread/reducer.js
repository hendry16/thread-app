import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.detailThread;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT_THREAD_DETAIL:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.UP_VOTE_THREAD_DETAIL: {
      const { userId } = action.payload;
      return {
        ...detailThread,
        upVotesBy: [userId, ...detailThread.upVotesBy.filter((id) => id !== userId)],
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== userId),
      };
    }
    case ActionType.DOWN_VOTE_THREAD_DETAIL: {
      const { userId } = action.payload;
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== userId),
        downVotesBy: [userId, ...detailThread.downVotesBy.filter((id) => id !== userId)],
      };
    }
    case ActionType.NEUTRAL_VOTE_THREAD_DETAIL: {
      const { userId } = action.payload;
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== userId),
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== userId),
      };
    }
    case ActionType.UP_VOTE_COMMENT: {
      const { userId } = action.payload;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [userId, ...comment.upVotesBy.filter((id) => id !== userId)],
              downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        }),
      };
    }
    case ActionType.DOWN_VOTE_COMMENT: {
      const { userId } = action.payload;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
              downVotesBy: [userId, ...comment.downVotesBy.filter((id) => id !== userId)],
            };
          }
          return comment;
        }),
      };
    }
    case ActionType.NEUTRAL_VOTE_COMMENT: {
      const { userId } = action.payload;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        }),
      };
    }
    default:
      return detailThread;
  }
}

export default detailThreadReducer;

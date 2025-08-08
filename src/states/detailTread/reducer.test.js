/*
 * test scenario for detailThreadReducer
 *
 * - detailThreadReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the thread detail when given RECEIVE_THREAD_DETAIL action
 *   - should return null when given CLEAR_THREAD_DETAIL action
 *   - should add new comment to the top when given ADD_COMMENT_THREAD_DETAIL action
 *   - should add user to upVotesBy and remove from downVotesBy when given UP_VOTE_THREAD_DETAIL
 *      action
 *   - should add user to downVotesBy and remove from upVotesBy when given DOWN_VOTE_THREAD_DETAIL
 *      action
 *   - should remove user from upVotesBy or downVotesBy when given NEUTRAL_VOTE_THREAD_DETAIL
 *      action
 *   - should up-vote the correct comment when given UP_VOTE_COMMENT action
 *   - should down-vote the correct comment when given DOWN_VOTE_COMMENT action
 *   - should neutralize vote for the correct comment when given NEUTRAL_VOTE_COMMENT action
 */

import detailThreadReducer from './reducer';
import { ActionType } from './action';

const dummyDetailThread = {
  id: 'thread action-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const dummyComment = {
  id: 'comment-2',
  content: 'Ini adalah komentar kedua',
  createdAt: '2021-06-21T08:15:00.000Z',
  upVotesBy: ['users-2'],
  downVotesBy: [],
  owner: {
    id: 'users-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
};

describe('detailThreadReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        detailThread: dummyDetailThread,
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const initialState = dummyDetailThread;
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should add new comment to the top when given ADD_COMMENT_THREAD_DETAIL action', () => {
    const initialState = dummyDetailThread;
    const action = {
      type: ActionType.ADD_COMMENT_THREAD_DETAIL,
      payload: {
        comment: dummyComment,
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        action.payload.comment,
        ...initialState.comments,
      ],
    });
  });

  it('should add user to upVotesBy and remove from downVotesBy when given UP_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      ...dummyDetailThread,
      downVotesBy: ['users-3'],
    };

    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'users-3',
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['users-3'],
      downVotesBy: [],
    });
  });

  it('should add user to downVotesBy and remove from upVotesBy when given DOWN_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      ...dummyDetailThread,
      upVotesBy: ['users-3'],
    };

    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'users-3',
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: ['users-3'],
    });
  });

  it('should remove user from upVotesBy or downVotesBy when given NEUTRAL_VOTE_THREAD_DETAIL action', () => {
    const initialState = {
      ...dummyDetailThread,
      upVotesBy: ['users-3'],
    };

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'users-3',
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
    });
  });

  it('should up-vote the correct comment when given UP_VOTE_COMMENT action', () => {
    const initialState = dummyDetailThread;
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-3'],
          downVotesBy: [],
        },
      ],
    });
  });

  it('should down-vote the correct comment when given DOWN_VOTE_COMMENT action', () => {
    const initialState = dummyDetailThread;
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['users-3'],
        },
      ],
    });
  });

  it('should neutralize vote for the correct comment when given NEUTRAL_VOTE_COMMENT action', () => {
    const initialState = {
      ...dummyDetailThread,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['users-3'],
        },
      ],
    };

    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual(dummyDetailThread);
  });
});

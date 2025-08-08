/*
 * test scenario for threadsReducer
 *
 * - threadsReducer test
 *  - should return the initial state when the action type is UNKNOWN
 *  - should return the new threads from the payload when given RECEIVE_THREAD action
 *  - should add a new thread to the top of the thread array when given ADD_THREAD action
 *  - should add the userId to upVotesBy if not already present when given UP_VOTE_THREAD action
 *  - should add the userId to upVotesBy and remove from downVotesBy if it was downvoted when given
 *    UP_VOTE_THREAD action
 *  - should add the userId to downVotesBy if not already present when given DOWN_VOTE_THREAD action
 *  - should add the userId to downVotesBy and remove from upVotesBy if it was upvoted when given
 *    DOWN_VOTE_THREAD action
 *  - should remove the userId from upVotesBy if present when given NEUTRAL_VOTE_THREAD action
 *  - should remove the userId from downVotesBy if present when given NEUTRAL_VOTE_THREAD action
 */

import { ActionType } from './action';
import threadsReducer from './reducer';

const dummyThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const newDummyThread = {
  id: 'thread-3',
  title: 'Thread Ketiga',
  body: 'Ini adalah thread ketiga yang membahas topik menarik',
  category: 'Technology',
  createdAt: '2021-06-22T08:30:00.000Z',
  ownerId: 'users-3',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

describe('threadsReducer test', () => {
  it('should return the initial state when the action type is UNKNOWN', () => {
    const initialState = dummyThreads;
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the new threads from the payload when given RECEIVE_THREAD action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: dummyThreads,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should add a new thread to the top of the thread array when given ADD_THREAD action', () => {
    const initialState = dummyThreads;
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newDummyThread,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      action.payload.thread,
      ...dummyThreads,
    ]);
  });

  it('should add the userId to upVotesBy if not already present when given UP_VOTE_THREAD action', () => {
    const initialState = dummyThreads;
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-2',
        userId: 'users-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: ['users-3'],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should add the userId to upVotesBy and remove from downVotesBy if it was downvoted when given UP_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: ['users-2'], // users-2 included
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-2',
        userId: 'users-2',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: ['users-2'], // users-2 added
        downVotesBy: [], // users-2 removed
        totalComments: 0,
      },
    ]);
  });

  it('should add the userId to downVotesBy if not already present when given DOWN_VOTE_THREAD action', () => {
    const initialState = dummyThreads;
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-3'], // users-3 added
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should add the userId to downVotesBy and remove from upVotesBy if it was upvoted when given DOWN_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-3'], // users-3 included
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [], // users-3 removed
        downVotesBy: ['users-3'], // users-3 added
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should remove the userId from upVotesBy if present when given NEUTRAL_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-3'], // users-3 included
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(dummyThreads);
  });

  it('should remove the userId from downVotesBy if present when given NEUTRAL_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-3'], // users-3 included
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(dummyThreads);
  });
});

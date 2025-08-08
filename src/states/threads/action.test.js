/**
 * threads thunk test scenarios
 *
 * - asyncAddThread thunk
 *   - should dispatch addThreadActionCreator when createThread is successful
 *   - should alert error when createThread fails
 */

import { createThread } from '../../utils/api';
import { ActionType, addThreadActionCreator, asyncAddThread } from './action';

jest.mock('../../utils/api');
jest.mock('./action', () => {
  const original = jest.requireActual('./action');
  return {
    ...original,
    addThreadActionCreator: jest.fn(),
  };
});

describe('threads thunk', () => {
  const fakeThreads = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  };

  describe('asyncAddThread thunk', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should dispatch addThreadActionCreator when createThread is successful', async () => {
      createThread.mockResolvedValue(fakeThreads);
      addThreadActionCreator({
        type: ActionType.ADD_THREAD,
        payload: {
          thread: fakeThreads,
        },
      });

      const dispatch = jest.fn();

      await asyncAddThread({
        title: fakeThreads.title,
        category: fakeThreads.category,
        body: fakeThreads.body,
      })(dispatch);

      expect(createThread).toHaveBeenCalledWith({
        title: fakeThreads.title,
        category: fakeThreads.category,
        body: fakeThreads.body,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.ADD_THREAD,
        payload: {
          thread: fakeThreads,
        },
      });
    });

    it('should alert error when createThread fails', async () => {
      createThread.mockRejectedValue(new Error('Failed to create thread'));

      window.alert = jest.fn();
      const dispatch = jest.fn();

      await asyncAddThread({
        title: fakeThreads.title,
        category: fakeThreads.category,
        body: fakeThreads.body,
      })(dispatch);

      expect(window.alert).toHaveBeenCalledWith('Failed to create thread');
    });
  });
});

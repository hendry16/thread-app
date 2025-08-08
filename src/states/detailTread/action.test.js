/**
 * threadDetail thunk test scenarios
 *
 * - asyncReceiveThreadDetail thunk
 *   - should dispatch actions correctly when data fetching success
 *   - should dispatch actions and call alert when data fetching failed
 *
 * - asyncAddCommentThreadDetail thunk
 *   - should dispatch action correctly when createComment success
 *   - should call alert when createComment failed
 */

import { createComment, getThreadDetail } from '../../utils/api';
import { hideLoading, showLoading } from '../loading/loadingSlice';
import {
  ActionType, addCommentActionCreator, asyncAddCommentThreadDetail, asyncReceiveThreadDetail,
  clearThreadDetailActionCreator, receiveThreadDetailActionCreator,
} from './action';

jest.mock('../../utils/api');
jest.mock('../loading/loadingSlice');
jest.mock('./action', () => {
  const original = jest.requireActual('./action');
  return {
    ...original,
    receiveThreadDetailActionCreator: jest.fn(),
    clearThreadDetailActionCreator: jest.fn(),
    addCommentActionCreator: jest.fn(),
  };
});

describe('threadDetail thunk', () => {
  const fakeThread = {
    id: 'thread-1',
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

  const fakeComment = {
    id: 'comment-1',
    content: 'Ini adalah komentar pertama',
    createdAt: '2021-06-21T07:00:00.000Z',
    upVotesBy: [],
    downVotesBy: [],
    owner: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('asyncReceiveThreadDetail thunk', () => {
    it('should dispatch actions correctly when data fetching success', async () => {
      getThreadDetail.mockReturnValue(fakeThread);
      clearThreadDetailActionCreator({ type: ActionType.CLEAR_THREAD_DETAIL });
      receiveThreadDetailActionCreator({
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: { detailThread: fakeThread },
      });

      const dispatch = jest.fn();

      await asyncReceiveThreadDetail('thread-1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(getThreadDetail).toHaveBeenCalledWith('thread-1');
      expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch actions and call alert when data fetching failed', async () => {
      getThreadDetail.mockRejectedValue(new Error('Fetching failed'));
      window.alert = jest.fn();
      clearThreadDetailActionCreator({ type: ActionType.CLEAR_THREAD_DETAIL });

      const dispatch = jest.fn();

      await asyncReceiveThreadDetail('thread-1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith('Fetching failed');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncAddCommentThreadDetail thunk', () => {
    it('should dispatch action correctly when createComment success', async () => {
      createComment.mockResolvedValue(fakeComment);
      addCommentActionCreator.mockReturnValue({
        type: ActionType.ADD_COMMENT_THREAD_DETAIL,
        payload: {
          comment: fakeComment,
        },
      });

      const dispatch = jest.fn();

      await asyncAddCommentThreadDetail('thread-1', 'test')(dispatch);

      expect(createComment).toHaveBeenCalledWith('thread-1', { content: 'test' });
      expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeComment));
    });

    it('should call alert when createComment failed', async () => {
      createComment.mockRejectedValue(new Error('Failed'));
      window.alert = jest.fn();

      const dispatch = jest.fn();

      await asyncAddCommentThreadDetail('thread-1', 'test')(dispatch);

      expect(window.alert).toHaveBeenCalledWith('Failed');
    });
  });
});

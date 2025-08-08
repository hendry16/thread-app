/*
 * test scenario for userReducer
 *
 * - userReducer test
 *  - should return the current state when action type is UNKNOWN
 *  - should return the users when action type is RECEIVE_USERS
 */

import usersReducer from './reducer';
import { ActionType } from './action';

const dummyUsers = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

describe('test scenario for userReducer', () => {
  it('should return the initial state when action type is UNKNOWN', () => {
    const initialState = dummyUsers;
    const action = { type: 'UNKNOWN' };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the users when action type is RECEIVE_USERS', () => {
    const initialState = dummyUsers;
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: dummyUsers,
      },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});

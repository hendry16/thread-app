/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state when given an unknown action
 *   - should set the auth user when given SET_AUTH_USER action
 *   - should unset (nullify) the auth user when given UNSET_AUTH_USER action
 */

import { ActionType } from './action';
import authUserReducer from './reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the auth user when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should unset (nullify) the auth user when given UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      type: ActionType.UNSET_AUTH_USER,
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    const action = { type: ActionType.UNSET_AUTH_USER };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });
});

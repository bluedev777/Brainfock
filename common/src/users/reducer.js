import * as authActions from '../auth/actions';
import User from './user';
import CurrentUser from './currentUser';
import {Record} from 'immutable';

const InitialState = Record({
  viewer: null
});
const initialState = new InitialState;

function revive({viewer}) {
  return initialState.merge({
    // Handle user authenticated on the server.
    viewer: viewer ? new CurrentUser(viewer) : null
  });
}

export default function usersReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case authActions.LOGIN_SUCCESS: {
      const {email} = action.payload;
      return state.set('viewer', new CurrentUser({email}));
    }
    case authActions.LOGOUT_SUCCESS: {
      return state.set('viewer',null);
    }

  }

  return state;
}

import { fromJS } from 'immutable';

export default function createReducer(initialState, actions) {
  return function reducer(state = initialState, action) {
    const { type } = action;
    if (!actions[type]) return state;
    return actions[type](state, action);
  };
}

export function createBasicReducer(updateActionType, initialState = {}) {
  return createReducer(initialState, {
    [updateActionType]: (state, { payload }) => ({ ...state, ...payload })
  });
}

export function createBasicImmutableReducer(updateActionType, initialState = {}) {
  return createReducer(fromJS(initialState), {
    [updateActionType]: (state, { payload }) => state.merge(payload)
  });
}

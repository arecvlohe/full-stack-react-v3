import { combineReducers } from "redux";

import * as msg from "../messages";

const initialState = {
  todosState: {},
  todoState: {}
};

function app(state = initialState, { type, payload = null }) {
  switch (type) {
    case msg.FETCH_TODOS_SUCCESS: {
      return Object.assign({}, state, { todosState: payload });
    }
    case msg.FETCH_TODO_SUCCESS: {
      return Object.assign({}, state, { todoState: payload });
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  app
});

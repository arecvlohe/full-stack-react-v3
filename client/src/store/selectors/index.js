import { createSelector } from "reselect";
import path from "ramda/src/path";

const todosPath = state => state.app.todosState;
export const todos = createSelector(todosPath, path(["data", "todos"]));

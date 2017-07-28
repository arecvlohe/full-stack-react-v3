const URI = `http://localhost:3000`;

export default {
  get: {
    todos: () => `${URI}/todos`,
    todo: id => `${URI}/todos/${id}`
  },
  post: {
    todo: () => `${URI}todos`
  },
  put: {
    todo: id => `${URI}/todos/${id}`
  },
  delete: {
    todo: id => `${URI}/todos/${id}`
  }
};

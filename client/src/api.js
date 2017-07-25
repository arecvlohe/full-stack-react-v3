const URI = `http://localhost:3000`;

export default {
  get: {
    todos: () => `${URI}/todos`,
    todo: id => `${URI}/${id}`
  },
  post: {
    todo: () => `${URI}todos`
  },
  put: {
    todo: id => `${URI}/${id}`
  },
  delete: {
    todo: id => `${URI}/${id}`
  }
};

import React from "react";
import { Link } from "react-router-dom";

export default function List({ todos }) {
  return (
    <div>
      <div>
        {todos &&
          todos.map(todo => {
            return (
              <div key={todo._id}>
                <Link to={`/${todo._id}`}>
                  {todo.title}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

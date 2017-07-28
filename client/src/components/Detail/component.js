import React from "react";

export default function Detail({ todo, input = "", handleChange }) {
  return (
    <div>
      <input name="input" value={input} onChange={handleChange} />
    </div>
  );
}

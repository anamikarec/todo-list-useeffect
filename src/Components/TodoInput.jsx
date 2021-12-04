import { useState } from "react";

function TodoInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  console.log(text);

  const handleSubmit = () => {
    onSubmit && onSubmit(text);
    setText("");
  };
  return (
    <div>
      <input placeholder="add something" onChange={handleChange} />
      <button onClick={handleSubmit}>ADD</button>
    </div>
  );
}

export default TodoInput;

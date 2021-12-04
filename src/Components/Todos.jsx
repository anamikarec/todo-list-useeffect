import axios from "axios";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";

const getTodos = () => {
  const config = {
    url: "https://json-server-mocker-masai.herokuapp.com/tasks",
    method: "get"
  };
  return axios(config);
};

const createTodo = (title) => {
  const payload = {
    title,
    status: false
  };
  const config = {
    url: "https://json-server-mocker-masai.herokuapp.com/tasks",
    method: "post",
    data: payload
  };
  return axios(config);
};

function Todos() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    handleGetTodos();
  }, []);

  const handleGetTodos = () => {
    return getTodos()
      .then((res) => {
        setTodos(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTodo = (id, status) => {
    return axios({
      url: `https://json-server-mocker-masai.herokuapp.com/tasks/${id}`,
      method: "patch",
      data: {
        status: status
      }
    });
  };
  const markEverythingAsComplete = async () => {
    try {
      const ids = todos.map((item) => item.id);
      // const requests = [];

      for (let id of ids) {
        console.log(id);
        await updateTodo(id, true);
      }

      // const results = await Promise.allSettled(requests);
      // do something with results
      await handleGetTodos();
    } catch (err) {}
  };

  const onSubmit = async (title) => {
    try {
      setIsLoading(true);
      await createTodo(title);
      await handleGetTodos();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      // manage your error with a state
    }
  };
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <TodoInput onSubmit={onSubmit} />

      <div>
        {todos.map((item) => (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.status ? "DONE" : "PENDING"}</div>
            {/* <button onClick={markEverythingAsComplete(item.id)}> */}
            {/* MARK AS DONE */}
            {/* </button> */}
          </div>
        ))}
      </div>
      <div>
        <button onClick={markEverythingAsComplete}>MARK ALL DONE</button>
      </div>
    </div>
  );
}

export default Todos;

// npm install axios

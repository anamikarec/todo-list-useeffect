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
  const [isError, setIsError] = useState(false);
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
    } catch (err) {
      setIsError(true);
    }
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
  if (isError) {
    return <div>Error 404</div>;
  }
  return (
    <div>
      <TodoInput onSubmit={onSubmit} />

      <div>
        {todos.map((item) => (
          <div key={item.id} style={{ padding: "20px", marginTop: "30px" }}>
            <span
              style={{ padding: "30px", color: "white", background: "black" }}
            >
              {item.title}
            </span>
            <span
              style={{ padding: "30px", color: "white", background: "black" }}
            >
              {item.status ? "DONE" : "PENDING"}
            </span>
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

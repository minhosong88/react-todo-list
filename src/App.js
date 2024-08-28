
import { useEffect, useState } from "react";

const TODOS_KEY = "toDos";

function App() {
  const [toDO, setToDo] = useState("");
  const [toDos, setToDos] = useState(() => {
    const savedToDos = localStorage.getItem(TODOS_KEY);
    return savedToDos ? JSON.parse(savedToDos) : []
  });
  const onChange = (event) => {
    setToDo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDO === "") {
      return;
    }
    setToDos((currentArray) => {
      const newToDos = [toDO, ...currentArray];
      localStorage.setItem(TODOS_KEY, JSON.stringify(newToDos));
      return newToDos;
    });
    setToDo("");
  };
  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
  }, [toDos]);

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDO}
          type="text"
          placeholder="Write your things to do" />
        <button> Add To-Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

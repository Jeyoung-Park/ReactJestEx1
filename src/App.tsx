import React, { useState } from "react";
import Styled from "styled-components";
import { Button, Input, TodoItem, InputContainer, TodoList } from "./Components";

const Container = Styled.div`
  min-heigth: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`;

const Contents = Styled.div`
  display:flex;
  background-color:#FFFFFF;
  flex-direction:column;
  padding:20px;
  border-radius:8px;
  box-shadow:5px 5px 10px rgba(0, 0, 0, 0.2);
`;

// const InputContainer = Styled.div`
//   display:flex;
// `;

const TodoListContainer = Styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y:scroll;
  border:1px solid #BDBDBD;
  margin-bottom: 20px;
`;

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (): void => {
    if (todo) {
      setTodoList([...todoList, todo]);
      setTodo("");
    }
  };

  const deleteTodo = (index: number): void => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
  };

  return (
    <Container>
      <Contents>
        <TodoList todoList={todoList} deleteTodo={deleteTodo} />

        <InputContainer
          todo={todo}
          onChange={(text:string) => setTodo(text)}
          onAdd={addTodo}
        />
      </Contents>
    </Container>
  );
};

export default App;

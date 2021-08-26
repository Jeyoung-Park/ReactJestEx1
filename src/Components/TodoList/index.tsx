import React, { useContext } from "react";
import Styled from "styled-components";
import { TodoListContext } from "../../Contexts";
import { TodoItem } from "../TodoItem";

const Container = Styled.div`
    min-width:350px;
    height:400px;
    overflow-y:scroll;
    border:1px solid #BDBDBD;
    margin-bottom:20px;
`;

interface Props {
  readonly todoList: string[];
  readonly deleteTodo: (index: number) => void;
}

export const TodoList = () => {
  const { todoList, deleteTodo } = useContext(TodoListContext);

  return (
    <Container data-testid="todoList">
      {todoList.map((item, index) => (
        <TodoItem key={item} label={item} onDelete={() => deleteTodo(index)} />
      ))}
    </Container>
  );
};

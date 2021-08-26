import { JSX_TYPES } from "@babel/types";
import React, { createContext, useState } from "react";
import { TodoList } from "../../Components";

interface Context {
  readonly todoList: string[];
  readonly addTodo: (todo: string) => void;
  readonly deleteTodo: (index: number) => void;
}

// 컨텍스트의 초기값 지정
const TodoListContext = createContext<Context>({
  todoList: [],
  addTodo: (): void => {},
  deleteTodo: (): void => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TodoListProvider = ({ children }: Props) => {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (todo: string): void => {
    if (todo) {
      setTodoList([...todoList, todo]);
    }
  };

  const deleteTodo = (index: number): void => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
  };

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        addTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };

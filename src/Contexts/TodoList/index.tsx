import { JSX_TYPES } from "@babel/types";
import React, { createContext, useEffect, useState } from "react";
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
      const newList = [...todoList, todo];
      localStorage.setItem("TodoList", JSON.stringify(newList));
      setTodoList(newList);
    }
  };

  const deleteTodo = (index: number): void => {
    let list = [...todoList];
    list.splice(index, 1);
    localStorage.setItem("TodoList", JSON.stringify(list));
    setTodoList(list);
  };

  useEffect(() => {
    const list = localStorage.getItem("TodoList");
    if (list) {
      setTodoList(JSON.parse(list));
    }
  }, []);

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

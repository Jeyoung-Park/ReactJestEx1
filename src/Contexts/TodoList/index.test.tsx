import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { TodoListContext, TodoListProvider } from ".";

// 테스트가 실행되기 전에 localStorage에 저장되는 내용을 모두 지움
beforeEach(() => {
  localStorage.clear();
});

describe("TodoList Context", () => {
  it("renders component correctly", () => {
    const ChildComponent = () => {
      return <div>Child Component</div>;
    };
    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    const childComponent = screen.getByText("Child Component");
    expect(childComponent).toBeInTheDocument();
    // 로컬 스토리지가 잘 비어있는지 체크
    expect(localStorage.getItem("TodoList")).toBeNull();
  });

  it("loads localStorage data and sets it to State", () => {
    // 로컬 스토리지에 데이터 추가
    localStorage.setItem("TodoList", '["Todo 1", "Todo 2", "Todo 3"]');

    const ChildComponent = () => {
      const { todoList } = useContext(TodoListContext);

      return (
        <div>
          {todoList.map((todo) => (
            <div key={todo}>{todo}</div>
          ))}
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    // 데이터가 잘 추가되어있는지 확인
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();
  });

  it("uses addTodo function", () => {
    const ChildComponent = () => {
      const { todoList, addTodo } = useContext(TodoListContext);
      return (
        <div>
          <div onClick={() => addTodo("study react 1")}>Add Todo</div>
          <div>
            {todoList.map((todo) => (
              <div key={todo}>{todo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    expect(localStorage.getItem("TodoList")).toBeNull();
    const button = screen.getByText("Add Todo");
    fireEvent.click(button);
    expect(screen.getByText("study react 1")).toBeInTheDocument();
    expect(localStorage.getItem("TodoList")).toBe('["study react 1"]');
  });

  it("uses deleteTodo function", () => {
    localStorage.setItem("TodoList", '["Todo 1", "Todo 2", "Todo 3"]');

    const ChildComponent = () => {
      const { todoList, deleteTodo } = useContext(TodoListContext);

      return (
        <div>
          {todoList.map((todo, index) => (
            <div key={todo} onClick={() => deleteTodo(index)}>
              {todo}
            </div>
          ))}
        </div>
      );
    };
    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    const todoItem = screen.getByText("Todo 2");
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem);
    expect(todoItem).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem("TodoList") as string)
    ).not.toContain("Todo 2");
  });
});

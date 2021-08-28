import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import { TodoListProvider } from "../../Contexts";
import { TodoList } from ".";

describe("<TodoList />", () => {
  it("renders component correctly", () => {
    const { container } = render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    );

    const todoList = screen.getByTestId("todoList");
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it("shows todoList", () => {
    // 로컬스토리지에 임시 데이터 추가
    localStorage.setItem("TodoList", '["Todo 1", "Todo 2", "Todo 3"]');

    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    );

    // 로컬 스토리지에 추가한 데이터가 있는지 확인
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();
    // 데이터의 개수가 3개인지 확인
    expect(screen.getAllByText("삭제").length).toBe(3);
  });

  it("deletes todo item", () => {
    localStorage.setItem("TodoList", '["Todo 1", "Todo 2", "Todo 3"]');

    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    );

    const todoItem = screen.getByText("Todo 2");
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem.nextElementSibling as HTMLElement);
    expect(todoItem).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem("TodoList") as string)
    ).not.toContain("Todo 2");
  });
});

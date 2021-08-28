import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "jest-styled-components";

describe("<App />", () => {
  it("renders components correctly", () => {
    const { container } = render(<App />);

    const todoList = screen.getByTestId("todoList"); // 할 일 목록 데이터가 비어 있는지 테스트
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull(); // 할 일 목록의 데이터가 표시될 부분의 자식 요소가 비어 있음을 확인

    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");
    expect(input).toBeInTheDocument();
    const label = screen.getByText("추가");
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("adds and deletes Todo Items", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("할 일을 입력해 주세요");
    const button = screen.getByText("추가");
    fireEvent.change(input, { target: { value: "study react 1" } });
    fireEvent.click(button); // 클릭 이벤트

    // study react 1 이란 요소 추가
    const todoItem = screen.getByText("study react 1");
    expect(todoItem).toBeInTheDocument();
    const deleteButton = screen.getByText("삭제");
    expect(deleteButton).toBeInTheDocument();

    const todoList = screen.getByTestId("todoList");
    expect(todoList.childElementCount).toBe(1);

    // study react 2 이란 요소 추가
    fireEvent.change(input, { target: { value: "study react 2" } });
    fireEvent.click(button);

    const todoItem2 = screen.getByText("study react 2");
    expect(todoItem2).toBeInTheDocument();
    expect(todoList.childElementCount).toBe(2);

    // 삭제 이벤트
    const deleteButtons = screen.getAllByText("삭제");
    fireEvent.click(deleteButtons[0]);

    expect(todoItem).not.toBeInTheDocument();
    expect(todoList.childElementCount).toBe(1);
  });

  it("does not add empty todo", () => {
    render(<App />);

    const todoList = screen.getByTestId("todoList");
    const length = todoList.childElementCount;

    const button = screen.getByText("추가");
    fireEvent.click(button);

    expect(todoList.childElementCount).toBe(length);
  });

  // 로컬 스토리지에 데이터 추가한 뒤 잘 추가되었는지 확인하는 테스트
  it("loads localStorage data", () => {
    localStorage.setItem("TodoList", '["Todo 1", "Todo 2", "Todo 3"]');
    render(<App />);

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();
    expect(screen.getAllByText("삭제").length).toBe(3);
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "jest-styled-components";

import { Input } from "./index";

describe("<Input />", () => {
  it("renders component correctly", () => {
    const { container } = render(<Input value="default value" />);

    const input = screen.getByDisplayValue("default value"); // value를 이용해서 검색(Query)
    expect(input).toBeInTheDocument(); // toBeInTheDocument: 화면에 표시되었는지 확인

    expect(container).toMatchSnapshot();
  });

  //placeholder 테스트
  it("renders placeholder correctly", () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText("default placeholder");
    expect(input).toBeInTheDocument();
  });

  // 사용자가 input 컴포넌트에 데이터를 입력하는 것을 테스트
  it("changes the data", () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText(
      "default placeholder"
    ) as HTMLInputElement; // HTML의  input 태그 -> HTMLInputElement로 형 변환
    fireEvent.change(input, { target: { value: "study react" } });
    expect(input.value).toBe("study react");
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "jest-styled-components";

import { Button } from "./index";

describe("<Button />", () => {
  it("renders component correctly", () => {
    const { container } = render(<Button label="Button Text" />);

    const label = screen.getByText("Button Text"); // label이 Button Text인 컴포넌트
    expect(label).toBeInTheDocument(); // toBeInTheDocument: 화면에 표시되어 있는지 확인

    const parent = label.parentElement;
    expect(parent).toHaveStyleRule("background-color", "#304FFE");
    expect(parent).toHaveStyleRule("background-color", "#1E40FF", {
      modifier: ":hover",
    });

    expect(container).toMatchSnapshot();
  });

  it("changes backgroundColor and hoverColor Props", () => {
    const backgroundColor = "#FF1744";
    const hoverColor = "#F01440";
    render(
      <Button
        label="Button Test"
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
      />
    );

    const parent = screen.getByText("Button Test").parentElement;
    expect(parent).toHaveStyleRule("background-color", backgroundColor);
    expect(parent).toHaveStyleRule("background-color", hoverColor, {
      modifier: ":hover",
    });
  });

  it("clicks the button", () => {
    const handleClick = jest.fn(); // jest.fn을 활용해 handleClick 변수를 선언하고 선언한 변수를 Button 컴포넌트의 props인 onClick을 통해 전달
    render(<Button label="Button Test" onClick={handleClick} />);

    // jest의 모의함수(props로 전달된 onClick 이벤트가 전달되었는지 확인)
    const label = screen.getByText("Button Test");
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

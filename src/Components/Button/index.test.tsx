import React from "react";
import { render, screen } from "@testing-library/react";
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
});

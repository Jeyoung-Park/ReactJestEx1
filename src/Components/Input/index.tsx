import React from "react";
import Styled from "styled-components";

const InputBox = Styled.input`
    flex:1;
    font-size:16px;
    padding:10px 10px;
    border-radius: 8px;
    border: 1px solid #BDBDBD;
    outline:none;
`;

interface Props {
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
  readonly value?: string;
}

export const Input = ({
  placeholder = "할 일을 입력해주세요",
  onChange,
  value,
}: Props) => {
  return (
    <InputBox
      placeholder={placeholder}
      onChange={(event) => {
        if (typeof onChange === "function") {
          onChange(event.target.value);
        }
      }}
      value={value}
    />
  );
};

import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import { Button } from "../Button";
import { Input } from "../Input";

const Container = Styled.div`
    display:flex;
`;

interface Props {
  readonly todo?: string;
  readonly onChange?: (text: string) => void;
  readonly onAdd?: () => void;
}

export const InputContainer = ({ todo, onChange, onAdd }: Props) => {
  return (
    <Container>
      <Input
        placeholder="할 일을 입력해 주세요"
        value={todo}
        onChange={onChange}
      />
      <Button label="추가" onClick={onAdd} />
    </Container>
  );
};


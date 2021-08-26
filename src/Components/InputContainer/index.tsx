import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import { Button } from "../Button";
import { Input } from "../Input";
import { TodoListContext } from "../../Contexts";

const Container = Styled.div`
    display:flex;
`;

interface Props {
  readonly todo?: string;
  readonly onChange?: (text: string) => void;
  readonly onAdd?: () => void;
}

export const InputContainer = () => {
  const [todo, setTodo] = useState("");
  // 컨텍스트를 사용하는 경우
  const { addTodo } = useContext(TodoListContext);

  return (
    <Container>
      <Input
        placeholder="할 일을 입력해 주세요"
        value={todo}
        onChange={setTodo}
      />
      <Button
        label="추가"
        onClick={() => {
          addTodo(todo);
          setTodo("");
        }}
      />
    </Container>
  );
};

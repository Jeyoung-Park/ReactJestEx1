import React from "react";
import Styled from "styled-components";
import { Button, Input, TodoItem } from "./Components";

const Container = Styled.div`
  min-heigth: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`;

const Contents = Styled.div`
  display:flex;
  background-color:#FFFFFF;
  flex-direction:column;
  padding:20px;
  border-radius:8px;
  box-shadow:5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const InputContainer = Styled.div`
  display:flex;
`;

const App = () => {
  return (
    <Container>
      <Contents>
        <TodoItem label={"추가된 일"} onDelete={() => alert("삭제")} />
        <InputContainer>
          <Input
            placeholder="할 일을 입력해주세요"
            onChange={(text) => console.log(text)}
          />
          <Button
            label="테스트"
            backgroundColor="red"
            hoverColor="green"
            onClick={() => alert("test")}
          />
        </InputContainer>
      </Contents>
    </Container>
  );
};

export default App;

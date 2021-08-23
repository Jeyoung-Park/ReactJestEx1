import React, { useState } from "react";
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

const TodoListContainer = Styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y:scroll;
  border:1px solid #BDBDBD;
  margin-bottom: 20px;
`;

interface Props {}

interface State {
  readonly todo: string;
  readonly todoList: string[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todo: "",
      todoList: [],
    };
  }

  private addTodo = (): void => {
    const { todo, todoList } = this.state;
    if (todo) {
      this.setState({
        todo: "",
        todoList: [...todoList, todo],
      });
    }
  };

  private deleteTodo = (index: number): void => {
    let list = [...this.state.todoList];
    list.splice(index, 1);
    this.setState({
      todoList: list,
    });
  };

  render() {
    const { todo, todoList } = this.state;

    return (
      <Container>
        <Contents>
          <TodoListContainer data-testid="todoList">
            {todoList.map((item, index) => (
              <TodoItem
                key={item}
                label={item}
                onDelete={() => this.deleteTodo(index)}
              />
            ))}
          </TodoListContainer>
          <InputContainer>
            <Input
              placeholder="항 일을 입력해 주세요"
              value={todo}
              onChange={(text) => this.setState({ todo: text })}
            />
            <Button label="추가" onClick={this.addTodo} />
          </InputContainer>
        </Contents>
      </Container>
    );
  }
}

// const App = () => {
//   const [todo, setTodo] = useState("");
//   const [todoList, setTodoList] = useState<string[]>([]);

//   const addTodo = (): void => {
//     if (todo) {
//       setTodoList([...todoList, todo]);
//       setTodo("");
//     }
//   };

//   const deleteTodo = (index: number): void => {
//     let list = [...todoList];
//     list.splice(index, 1);
//     setTodoList(list);
//   };

//   return (
//     <Container>
//       <Contents>
//         <TodoListContainer data-testid='todoList'>
//           {todoList.map((item, index) => (
//             <TodoItem
//               key={item}
//               label={item}
//               onDelete={() => deleteTodo(index)}
//             />
//           ))}
//         </TodoListContainer>

//         <InputContainer>
//           <Input
//             placeholder="할 일을 입력해 주세요"
//             onChange={(text) => setTodo(text)}
//             value={todo}
//           />
//           <Button
//             label="추가"
//             backgroundColor="red"
//             hoverColor="green"
//             onClick={addTodo}
//           />
//         </InputContainer>
//       </Contents>
//     </Container>
//   );
// };

export default App;

import React, { useState } from "react";
import Styled from "styled-components";
import { IScriptSnapshot } from "typescript";
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
  // 생성자 함수
  // State의 초기값 설정
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

  // 렌더링되는 부분 정의
  // props나 state가 바뀌어 화면이 갱신되는 경우 호출
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

  // 부모로부터 받은 Props와 State를 동기화할 때 사용
  // Props로 State에 값을 설정 or State 값이 Props에 의존하여 결정된느 경우 사용
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log("getDerivedStateFromProps");

    // state에 설정하고 싶은 값 반환
    return null;
  }

  // 컴포넌트가 처음으로 화면에 표시된 이후 호출
  componentDidMount() {
    console.log("componentDidMount");
  }

  // render 함수가 호출된 후 실제로 화면이 갱신되기 직전에 이 함수 호출
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log("getSnapShotBeforeUpdate");

    return {
      testData: true,
    };
  }

  // props, state가 변경되어 render 함수가 호출된 후 호출되는 함수
  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: IScriptSnapshot
  ) {
    console.log("componentDidUpdate");
  }

  // props, state를 비교해 화면이 리렌더링될지 여부를 결정
  // true면 리렌더, false면 리렌더 x
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    console.log("shouldComponentUpdate");
    return true;
  }

  // 컴포넌트가 화면에서 완전히 사라진 후 호출
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // 컴포넌트를 렌더링하는 부분에서 발생하는 에러를 처리하기 위한 함수
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // this.setState({
    // error:true,
    // })
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

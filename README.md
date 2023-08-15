<br/>

## Redux 기본 개념

Redux는 상태 관리 라이브러리로
그 핵심 개념에는 actions, reducers, store 등이 포함된다. 
이 개념들이 함께 작동하여 애플리케이션의 상태를 효과적으로 관리한다.

**Actions**: 상태를 변경하려는 의도를 나타내는 평범한 JavaScript 객체. 
각 액션은 일반적으로 type 필드를 포함하며, 필요에 따라 추가적인 데이터를 가질 수 있다.

**Reducers**: 액션을 받아 현재 상태를 변경하여 새로운 상태를 반환하는 순수 함수이다. 
리듀서는 이전 상태와 액션을 인수로 받아 새 상태를 반환한다.

**Store**: Redux 애플리케이션의 현재 상태를 보유하는 객체. 
createStore 함수를 사용하여 생성된다. 
스토어는 애플리케이션의 상태를 저장하며, 다음과 같은 주요 메서드들을 제공한다.

**getState()**: 현재 상태를 반환한다.
**dispatch(action)**: 액션을 리듀서에 전달하여 상태를 변경한다.
**subscribe(listener)**: 상태가 변경될 때마다 실행될 콜백 함수를 등록한다.

이러한 개념들이 서로 상호 작용하여 애플리케이션의 상태를 일관되게 관리하도록 도와준다.

<br/>

## Redux 쉽게 이해하기 

Redux는 애플리케이션의 **상태를 중앙 집중식으로 관리**하는 라이브러리이다. 
Redux의 핵심 원칙 중 하나는 상태는 **읽기 전용**이다.
**상태를 변경**할 수 있는 유일한 방법은 **액션을 보내는 것**이다.

액션을 보냈을 때 상태는 어떻게 바뀔까? 
바로 여기서 **리듀서(reducer)** 가 중요한 역할을 한다. 
리듀서는 이전 상태와 액션을 입력으로 받아, 새로운 상태를 반환하는 함수다.

**redux는 상태관리** 다.

<br/>

## Redux 코드로 이해하기

화면에서 이벤트로 dispath 를 걸어놓은 버튼을 클릭하자.
handleSubmit을 호출하고 있다.

```js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
```

버튼은 아래 메서드를 호출한다.
```js
dispatch(addTodo(input));  
```

무슨 뜻일까?

- dispatch 액션을 발행하여 상태를 변경하라는 명령을 내리는 메서드
addTodo(input)는 액션 생성자의 한 예
- 이 함수를 호출하면, todo를 add한다가 시작했음을 나타내는 액션 객체를 반환한다.
- 이 객체는 type 속성을 포함하며, 필요한 경우 추가 데이터(payload)도 포함할 수 있다.
- 사실상 "todo add 액션을 발행하라"는 의미
- 이 액션을 발행하면 Redux 스토어에 있는 리듀서가 호출되어 상태가 업데이트된다.

type 필드를 포함하며, 필요에 따라 추가적인 데이터를 가진 addTodo **Action** 객체 확인 할수 있다.

```js
export const addTodo = (content) => ({
    type: 'ADD_TODO',
    payload: {
        id: Date.now(),
        content,
        completed: false
    }
});
```

Redux 미들웨어를 거친다.

```js
import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    // applyMiddleware는 Redux store에 미들웨어를 적용하는 함수
    // 미들웨어는 Redux action이 dispatch될 때부터 리듀서에 도달하기 전까지의 프로세스를 확장하거나 수정할 수 해줌.
    // thunk는 특히 Redux 미들웨어 중 하나로, 비동기 작업이나 side effect을 다룰 때 유용하게 사용됨.
    // 기본적인 Redux는 동기적인 액션만 지원한다.
    // 즉, 액션을 dispatch하면 바로 상태가 업데이트된다.
    // 그러나 실제 애플리케이션에서는 서버 요청 같은 비동기 작업을 처리해야 하는 경우가 많다. 
    // thunk를 사용하면 함수 형태의 액션을 dispatch하여 비동기 작업을 수행한 후, 
    // 그 결과에 따라 다른 액션을 dispatch할 수 있다.
    applyMiddleware(thunk)
  )
);

export default store;
```

액션이 발행되면, 스토어에 등록된 리듀서가 호출된다.
리듀서는 현재 상태와 액션 객체를 인자로 받아 새로운 상태를 반환한다. 
각 리듀서는 자신의 관리 영역에 해당하는 상태 부분만을 처리하고, 새 상태를 반환한다.

=> dispatch로 액션이 발생되면 
리듀서(reducer)에서 해당 액션을 받아 새로운 상태와 payload를 반환한다. (상태관리)


```js
const initialState = [];

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'TOGGLE_TODO':
            return state.map(todo => todo.id === action.id ? {
                ...todo, completed: !todo.completed
            } : todo);
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
};

export default todoReducer;
```

리듀서가 반환한 새로운 상태로 스토어가 업데이트된다.
상태가 변경되면 react-redux 라이브러리의 connect 함수나 useSelector 훅을 사용하여 Redux 상태에 연결된 React 컴포넌트가 리렌더링 된다.

```js
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList() {
  // useSelector 훅
  const todos = useSelector((state) => state.todos);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
```

흐름도

```

+----------------+           +----------------+         +----------------+
|                | 1. 액션  |                | 2. 액션|                |
| React 컴포넌트 |---------->|  액션 생성자   |-------->|    Dispatch    |
|                |  발행    |                |  객체   |                |
+----------------+           +----------------+         +----------------+
                                               |
                                               |
                                               v
                                    +----------------+
                                    |                |
                                    |   미들웨어    |
                                    |                |
                                    +----------------+
                                               |
                                               |
                                               v
                                    +----------------+
                                    |                |
                                    |    리듀서     |
                                    |                |
                                    +----------------+
                                               |
                                               |
                                               v
                                    +----------------+
                                    |                |
                                    |     스토어     |
                                    |                |
                                    +----------------+
                                               |
                                               |
                                               v
                                    +----------------+
                                    |                |
                                    | React 컴포넌트 |
                                    |    리렌더링    |
                                    |                |
                                    +----------------+
```

<br/>

## 설치

```
$ npm install -g create-react-app
$ create-react-app redux-test
$ cd redux-test
$ npm install redux redux-thunk react-redux
$ npm install redux-devtools-extension
```


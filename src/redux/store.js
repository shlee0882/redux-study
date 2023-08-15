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
    // 그 결과에 따라 다른 액션을 dispatch할 수 있습니다.
    applyMiddleware(thunk)
  )
);

export default store;

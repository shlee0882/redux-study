// reducer.js
import { REQUEST_POSTS, RECEIVE_POSTS, FETCH_FAILED } from '../types/actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: null
};

// postsReducer는 리듀서의 한 예
// 해당 리듀서는 앱의 상태 중 게시물(post) 관련 상태를 관리한다. 
// 액션이 발생할 때마다 postsReducer는 호출되어 새로운 상태를 생성한다. 
// 이 리듀서는 게시물을 요청 중인지, 게시물 데이터가 성공적으로 로드되었는지, 또는 에러가 발생했는지 등의 상태를 관리한다.
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default postsReducer;

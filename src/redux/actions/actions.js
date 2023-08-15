// actions.js
import { REQUEST_POSTS, RECEIVE_POSTS, FETCH_FAILED } from '../types/actionTypes';

export const requestPosts = () => ({
  type: REQUEST_POSTS
});

export const receivePosts = data => ({
  type: RECEIVE_POSTS,
  payload: data
});

export const fetchFailed = error => ({
  type: FETCH_FAILED,
  payload: error
});

export const fetchPosts = () => dispatch => {
  // dispatch 액션을 발행하여 상태를 변경하라는 명령을 내리는 메서드
  // requestPosts()는 액션 생성자의 한 예
  // 이 함수를 호출하면, 게시물을 요청하기 시작했음을 나타내는 액션 객체를 반환한다.
  // 이 객체는 type 속성을 포함하며, 필요한 경우 추가 데이터(payload)도 포함할 수 있다.
  // 사실상 "게시물 요청 액션을 발행하라"는 의미
  // 이 액션을 발행하면 Redux 스토어에 있는 리듀서가 호출되어 상태가 업데이트됩니다.
  dispatch(requestPosts());

  // 더미 API 호출 예제입니다.
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => dispatch(receivePosts(data)))
    .catch(error => dispatch(fetchFailed(error)));
};

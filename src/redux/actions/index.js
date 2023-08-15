// 액션 상태를 변화하기 위해 진입되는곳

export const addTodo = (content) => ({
    type: 'ADD_TODO',
    payload: {
        id: Date.now(),
        content,
        completed: false
    }
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

export const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    id
});

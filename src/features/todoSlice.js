import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.payload);
        },
        completeTodo: (state, action) => {
            state.list[action.payload].completed = true;
        },
        deleteTodo: (state, action) => {
            if (Array.isArray(action.payload)) {
                const sortedIndices = action.payload.sort((a, b) => b - a);

                sortedIndices.forEach((index) => {
                    state.list.splice(index, 1);
                });
            } else {
                state.list.splice(action.payload, 1);
            }

        },
    },
});

export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todos.list;
export default todoSlice.reducer;

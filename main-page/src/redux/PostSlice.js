import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postList: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        addPost: (state, action) => {
            state.postList.push(action.payload);
        },
    },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;

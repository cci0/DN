import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postList: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        addPost: (state, action) => {
            const post = action.payload;
            post.date = new Date(post.date).toISOString();
            state.postList.push(post);
        },
    },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;

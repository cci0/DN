import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addPost } from '../redux/PostSlice';

export default function InputPost() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const newPost = {
            id: Date.now(),
            title: data.title,
            content: data.content,
        };

        dispatch(addPost(newPost));
        navigate('/MyDiary');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">제목</label>
                <input type="text" id="title" {...register('title', { required: '필수로 입혁해주세요' })} />
            </div>
            <div>
                <label htmlFor="content">내용</label>
                <textarea id="content" cols="30" rows="10" {...register('content')}></textarea>
            </div>
            <button>저장</button>
        </form>
    );
}

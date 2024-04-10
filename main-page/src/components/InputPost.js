import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addPost } from '../redux/PostSlice';
import '../styles/inputPost.scss';

export default function InputPost({ posts }) {
    const { register, handleSubmit } = useForm();
    const [selectedMood, setSelectedMood] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const newPost = {
            id: Date.now(),
            title: data.title,
            mood: selectedMood,
            content: data.content,
        };

        dispatch(addPost(newPost));

        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatePosts = [...savedPosts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatePosts));

        navigate('/MyDiary');
    };

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <form className="mb-input-post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-post-title">
                <input
                    type="text"
                    id="title"
                    placeholder="제목"
                    {...register('title', { required: '필수로 입력해주세요' })}
                />
            </div>
            <div className="mood">
                {['smile', 'meh', 'frown'].map((mood) => (
                    <img
                        key={mood}
                        className={`input-mood-${mood}${selectedMood === mood ? ' focused' : ''}`}
                        src={process.env.PUBLIC_URL + `/icons/${mood}.svg`}
                        alt={mood}
                        onClick={() => handleMoodSelect(mood)}
                    />
                ))}
            </div>
            <div className="input-post-content">
                <textarea
                    id="content"
                    cols="30"
                    rows="10"
                    placeholder="내용을 적어주세요."
                    {...register('content')}
                ></textarea>
            </div>

            <div className="post-input-btn">
                <button className="post-delete-btn" type="button" onClick={handleCancel}>
                    취소
                </button>
                <button className="post-save-btn" type="submit">
                    저장
                </button>
            </div>
        </form>
    );
}
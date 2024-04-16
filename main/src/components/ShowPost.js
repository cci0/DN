import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import '../styles/showPost.scss';

export default function ShowPost() {
    const [post, setPost] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedMood, setEditedMood] = useState('');
    const [editedMoodText, setEditedMoodText] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const { register } = useForm();

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const foundPost = savedPosts.find((post) => post.id === parseInt(id));
        setPost(foundPost);
    }, [id]);

    const formatTimeData = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hour = ('0' + (date.getHours() % 12 || 12)).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        const meridiem = date.getHours() >= 12 ? '오후' : '오전';

        const dateString = `${year}-${month}-${day}`;
        const timeString = `${meridiem} ${hour}시 ${minute}분`;

        return (
            <div className="time-data">
                <div className="date-string">{dateString}</div>
                <div className="time-string">{timeString}</div>
            </div>
        );
    };

    const postEdit = () => {
        setIsEdit(true);
        setEditedTitle(post.title);
        setEditedMood(post.mood);
        setEditedMoodText(post.moodText);
        setEditedContent(post.content);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSave = () => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

        const updatedPosts = savedPosts.map((savedPost) => {
            if (savedPost.id === parseInt(id)) {
                return {
                    ...savedPost,
                    title: editedTitle,
                    mood: editedMood,
                    moodText: editedMoodText,
                    content: editedContent,
                    lastModified: Date.now(),
                };
            }
            return savedPost;
        });

        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setIsEdit(false);
        window.location.reload();
    };

    const handleMoodSelect = (mood) => {
        setEditedMood(mood);
    };

    const postDelete = () => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = savedPosts.filter((savedPost) => savedPost.id !== parseInt(id));
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        navigate('/MyDiary');
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="mb-show-post" key={post.id}>
                {isEdit ? (
                    <div className="mb-edit-post">
                        <input
                            className="edit-post-title"
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <div className="edit-post-mood">
                            {['smile', 'meh', 'frown'].map((mood) => (
                                <img
                                    key={mood}
                                    className={`input-mood-${mood}${editedMood === mood ? ' focused' : ''}`}
                                    src={process.env.PUBLIC_URL + `/icons/${mood}.svg`}
                                    alt={mood}
                                    onClick={() => handleMoodSelect(mood)}
                                />
                            ))}
                            <input
                                type="text"
                                id="moodText"
                                defaultValue={editedMoodText}
                                placeholder="오늘의 기분은?"
                                {...register('moodText', { required: '필수로 입력해주세요' })}
                                onChange={(e) => setEditedMoodText(e.target.value)}
                            />
                        </div>
                        <textarea
                            className="edit-post-content"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="edit-post-btn">
                            <button className="edit-back-btn" onClick={handleCancel}>
                                취소
                            </button>
                            <button className="edit-save-btn" onClick={handleSave}>
                                저장
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-show-post2">
                        <div className="show-post-back-btn">
                            <button className="show-back-btn" onClick={handleCancel}>
                                <img className="back-icon" src={process.env.PUBLIC_URL + '/icons/x.svg'} alt="back" />
                            </button>
                        </div>
                        <div className="show-post-title">{post.title}</div>
                        <div className="show-post-choose">
                            <div className="show-post-mood">
                                {post.mood === 'smile' && (
                                    <div className="post-mood">
                                        <img
                                            className="mood-icon"
                                            src={process.env.PUBLIC_URL + '/icons/smile.svg'}
                                            alt="smile"
                                        />
                                        <span className="mood-text">{post.moodText}</span>
                                    </div>
                                )}
                                {post.mood === 'meh' && (
                                    <div className="post-mood">
                                        <img
                                            className="mood-icon"
                                            src={process.env.PUBLIC_URL + '/icons/meh.svg'}
                                            alt="meh"
                                        />
                                        <span className="mood-text">{post.moodText}</span>
                                    </div>
                                )}
                                {post.mood === 'frown' && (
                                    <div className="post-mood">
                                        <img
                                            className="mood-icon"
                                            src={process.env.PUBLIC_URL + '/icons/frown.svg'}
                                            alt="frown"
                                        />
                                        <span className="mood-text">{post.moodText}</span>
                                    </div>
                                )}
                            </div>

                            <div className="show-post-time">
                                {post.date && !post.lastModified && (
                                    <div className="edit-time">{formatTimeData(post.date)}</div>
                                )}
                                {post.lastModified && !post.date && (
                                    <div className="edit-time">
                                        <span className="show-post-time-title">수정 시간: </span>
                                        {formatTimeData(post.lastModified)}
                                    </div>
                                )}
                                {post.date && post.lastModified && (
                                    <div className="edit-time">
                                        <span className="show-post-time-title">수정 시간: </span>
                                        {formatTimeData(post.lastModified)}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="show-post-content">{post.content}</div>
                        <div className="show-post-btn">
                            <button className="edit-btn" onClick={postEdit}>
                                수정
                            </button>
                            <button className="delete-btn" onClick={postDelete}>
                                삭제
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

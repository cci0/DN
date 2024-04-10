import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/showPost.scss';

export default function ShowPost() {
    const [post, setPost] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedMood, setEditedMood] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const foundPost = savedPosts.find((post) => post.id === parseInt(id));
        setPost(foundPost);
    }, [id]);

    const postTimeData = (timestamp) => {
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
            <>
                <div className="date-string">{dateString}</div>
                <div className="time-string">{timeString}</div>
            </>
        );
    };

    const postEdit = () => {
        setIsEdit(true);
        setEditedTitle(post.title);
        setEditedMood(post.mood);
        setEditedContent(post.content);
    };

    const handleSave = () => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = savedPosts.map((savedPost) => {
            if (savedPost.id === parseInt(id)) {
                return {
                    ...savedPost,
                    title: editedTitle,
                    mood: editedMood,
                    content: editedContent,
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
            <div key={post.id}>
                {isEdit ? (
                    <>
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                        <div className="mood">
                            {['smile', 'meh', 'frown'].map((mood) => (
                                <img
                                    key={mood}
                                    className={`input-mood-${mood}${editedMood === mood ? ' focused' : ''}`}
                                    src={process.env.PUBLIC_URL + `/icons/${mood}.svg`}
                                    alt={mood}
                                    onClick={() => handleMoodSelect(mood)}
                                />
                            ))}
                        </div>
                        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                        <button onClick={handleSave}>저장</button>
                    </>
                ) : (
                    <>
                        <div>{post.title}</div>
                        <div>
                            {post.mood === 'smile' && (
                                <img
                                    className="mood-icon"
                                    src={process.env.PUBLIC_URL + '/icons/smile.svg'}
                                    alt="smile"
                                />
                            )}
                            {post.mood === 'meh' && (
                                <img className="mood-icon" src={process.env.PUBLIC_URL + '/icons/meh.svg'} alt="meh" />
                            )}
                            {post.mood === 'frown' && (
                                <img
                                    className="mood-icon"
                                    src={process.env.PUBLIC_URL + '/icons/frown.svg'}
                                    alt="frown"
                                />
                            )}
                        </div>
                        <div>{postTimeData(post.id)}</div>
                        <div>{post.content}</div>
                        <div>
                            <button onClick={postEdit}>수정</button>
                            <button onClick={postDelete}>삭제</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

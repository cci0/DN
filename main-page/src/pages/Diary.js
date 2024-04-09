import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/diary.scss';

export default function Diary() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 로컬 스토리지에서 데이터 불러오기
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(savedPosts);
    }, []);

    const timeData = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    };

    const [expandPost, setExpandPost] = useState(null);

    const toggleExpand = (postId) => {
        if (expandPost === postId) {
            setExpandPost(null);
        } else {
            setExpandPost(postId);
        }
    };

    console.log(posts);

    return (
        <div className="mb-diary">
            <div className="create-diary-btn">
                <Link to="/CreateDiary">
                    <img
                        className="create-icon"
                        src={process.env.PUBLIC_URL + '/icons/square-pen.svg'}
                        alt="square-pen"
                    />
                </Link>
            </div>
            <ul className="todo-listUp">
                {posts.map((post, index) => (
                    <li className="todo-list" key={post.id}>
                        <span className="todo-mood">
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
                        </span>
                        <span className="todo-title">{post.title}</span>
                        <span className="todo-time">{timeData(post.id)}</span>
                    </li>
                ))}
            </ul>

            <span className="todo-title" onClick={(post) => toggleExpand(post.id)}>
                {post.title}
            </span>
            <span className="todo-time">{timeData(post.id)}</span>
            {/* 토글된 상태에서만 내용 보이기 */}
            {expandedPostId === post.id && <div className="post-text">{post.text}</div>}
        </div>
    );
}

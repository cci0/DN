import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/diary.scss';

import TodayPost from '../components/TodayPost';

export default function Diary() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
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

    return (
        <div>
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
                <ul className="diary-listUp">
                    {posts.map((post, index) => (
                        <li key={post.id}>
                            <Link className="diary-list" to={`/MyDiary/${post.id}`}>
                                <span className="diary-mood">
                                    {post.mood === 'smile' && (
                                        <img
                                            className="mood-icon"
                                            src={process.env.PUBLIC_URL + '/icons/smile.svg'}
                                            alt="smile"
                                        />
                                    )}
                                    {post.mood === 'meh' && (
                                        <img
                                            className="mood-icon"
                                            src={process.env.PUBLIC_URL + '/icons/meh.svg'}
                                            alt="meh"
                                        />
                                    )}
                                    {post.mood === 'frown' && (
                                        <img
                                            className="mood-icon"
                                            src={process.env.PUBLIC_URL + '/icons/frown.svg'}
                                            alt="frown"
                                        />
                                    )}
                                </span>
                                <span className="diary-title">{post.title}</span>
                                <span className="diary-time">{timeData(post.id)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <TodayPost posts={posts} timeData={timeData} />
        </div>
    );
}

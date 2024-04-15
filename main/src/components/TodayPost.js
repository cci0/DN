import React, { useEffect, useState } from 'react';

import '../styles/todayPost.scss';

export default function TodayPost({ posts, timeData }) {
    const [todayPosts, setTodayPosts] = useState([]);

    useEffect(() => {
        const filterTodayPosts = () => {
            const today = new Date();
            const todayDateString = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${(
                '0' + today.getDate()
            ).slice(-2)}`;
            const filteredPosts = posts.filter((post) => timeData(post.id) === todayDateString);
            setTodayPosts(filteredPosts);
        };
        filterTodayPosts();
    }, [posts, timeData]);

    return (
        <div className="mb-today-post pc-today-post">
            <div className="today-date">Today Diary</div>
            <ul className="today-list">
                {todayPosts.map((post) => (
                    <li key={post.id}>
                        <div className="today-title">
                            <div className="diary-title">{post.title}</div>
                            <div className="diary-mood">
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
                                <div className="mood-text">{post.moodText}</div>
                            </div>
                        </div>
                        <div className="diary-content">{post.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

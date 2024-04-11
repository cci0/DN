import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TodayPost({ posts, timeData }) {
    const [todayPosts, setTodayPosts] = useState([]);
    const [todayDate, setTodayDate] = useState('');

    const filterTodayPosts = () => {
        const today = new Date();
        const todayDateString = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${(
            '0' + today.getDate()
        ).slice(-2)}`;

        setTodayDate(todayDateString);
        const filteredPosts = posts.filter((post) => timeData(post.id) === todayDateString);
        setTodayPosts(filteredPosts);
    };

    useEffect(() => {
        filterTodayPosts();
    }, [posts]);

    return (
        <div>
            <div>{todayDate}</div>
            <ul>
                {todayPosts.map((post) => (
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
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

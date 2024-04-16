import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/diary.scss';
import '../styles/pcDiary.scss';

import TodayPost from '../components/TodayPost';

export default function Diary() {
    const [posts, setPosts] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

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

    const filterMonth = (posts, year, month) => {
        return posts.filter((post) => {
            const postDate = new Date(post.id);
            return postDate.getFullYear() === year && postDate.getMonth() + 1 === month;
        });
    };

    const filteredPosts = filterMonth(posts, currentYear, currentMonth);

    const previousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="diary-page">
            <div className="mb-diary pc-diary">
                <div className="create-diary-btn">
                    <Link to="/CreateDiary">
                        <img
                            className="create-icon"
                            src={process.env.PUBLIC_URL + '/icons/square-pen.svg'}
                            alt="square-pen"
                        />
                    </Link>
                </div>
                <div className="month-navigation">
                    <button className="previous-btn" onClick={previousMonth}>
                        &lt;
                    </button>
                    <span className="this-month">
                        {currentYear}년 {('0' + currentMonth).slice(-2)}월
                    </span>
                    <button className="next-month" onClick={nextMonth}>
                        &gt;
                    </button>
                </div>
                <ul className="diary-listUp">
                    <div className="pc-create-diary-btn">
                        <Link to="/CreateDiary">
                            <img
                                className="create-icon"
                                src={process.env.PUBLIC_URL + '/icons/square-pen.svg'}
                                alt="square-pen"
                            />
                        </Link>
                    </div>
                    {filteredPosts.map((post, index) => (
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

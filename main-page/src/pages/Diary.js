import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Diary() {
    const posts = useSelector((state) => state.posts.postList);
    return (
        <div>
            <div></div>
            <div>
                <Link to="/CreateDiary">작성</Link>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div>{post.title}</div>
                        <div>{post.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

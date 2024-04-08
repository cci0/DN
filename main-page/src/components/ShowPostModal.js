import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ShowPostModal() {
    const [posts, setPosts] = useState([]);
    const [selectedPostIndex, setSelectedPostIndex] = useState(null); // 선택된 포스트 인덱스 상태 추가

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
        const hour = ('0' + (date.getHours() % 12 || 12)).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        const meridiem = date.getHours() >= 12 ? '오후' : '오전';

        return `${year}년 ${month}월 ${day}일 ${meridiem} ${hour}:${minute}`;
    };

    const openModal = (index) => {
        setSelectedPostIndex(index); // 선택된 포스트 인덱스 설정
    };

    const closeModal = () => {
        setSelectedPostIndex(null); // 선택된 포스트 인덱스 초기화
    };

    const modalRef = useRef();

    console.log(posts);

    return (
        <div>
            <div></div>
            <div>
                <Link to="/CreateDiary">작성</Link>
            </div>
            <ul>
                {posts.map((post, index) => (
                    <li key={post.id}>
                        <div
                            onClick={() => {
                                openModal(index); // 클릭 시 모달 열기 및 선택된 포스트 인덱스 설정
                            }}
                        >
                            {post.title} <span>{timeData(post.id)}</span>
                        </div>
                        <div>{post.content}</div>
                    </li>
                ))}
            </ul>
            {selectedPostIndex !== null && ( // 선택된 포스트 인덱스가 있을 때만 모달을 열도록 설정
                <div onClick={closeModal}>
                    <div ref={modalRef}>
                        <ShowPostModal post={posts[selectedPostIndex]} />
                    </div>
                </div>
            )}
        </div>
    );
}

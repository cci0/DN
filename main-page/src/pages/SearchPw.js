import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputUserId from '../components/InputUserId';

export default function SearchPw() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 여기서는 로컬에 저장된 값과 비교
        const savedUserId = localStorage.getItem('userId');
        const savedUserName = localStorage.getItem('userName');
        const savedEmail = localStorage.getItem('email');

        if (userId === savedUserId && userName === savedUserName && email === savedEmail) {
            navigate('/ChangePw');
        } else {
            alert('입력된 정보가 일치하지 않습니다.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* 이름 및 이메일 input */}
                <InputUserId setUserId={setUserId} setUserName={setUserName} setEmail={setEmail} />

                <button className="searchId-btn" type="submit">
                    <span>비밀번호 찾기</span>
                </button>
            </form>
        </div>
    );
}

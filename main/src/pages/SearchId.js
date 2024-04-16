import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import InputName from '../components/InputName';
import InputEmail from '../components/InputEmail';

import '../styles/searchId.scss';

export default function SearchId() {
    const navigate = useNavigate();

    // 이름과 이메일 상태
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // 이메일 도메인 선택 핸들러
    const handleDomainChange = (value) => {
        setUserData({
            ...userData,
            email: value,
        });
    };

    return (
        <div>
            <form className="serch-id">
                <div className="mb-Search-title">
                    <Link to={'/SearchId'}>
                        <span className="mb-search-id">아이디 찾기</span>
                    </Link>
                    <span>|</span>
                    <Link to={'/SearchPw'}>
                        <span>비밀번호 찾기</span>
                    </Link>
                </div>

                {/* 이름 및 이메일 input */}
                <div className="mb-input-user">
                    <InputName value={userData.name} onChange={handleChange} />
                    <InputEmail value={userData.email} onChange={handleChange} onDomainChange={handleDomainChange} />
                </div>

                <button className="searchId-btn" type="submit">
                    <span>아이디 찾기</span>
                </button>
            </form>

            <div className="back-login" onClick={() => navigate('/Login')}>
                로그인 하기
            </div>
        </div>
    );
}

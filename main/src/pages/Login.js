import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/login.scss';
import InputUser from '../components/InputUser';

export default function Login() {
    const navigate = useNavigate();

    // 사용자 정보 상태
    const [userData, setUserData] = useState({
        userId: '',
        pw: '',
    });

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // 로그인 버튼 클릭 핸들러
    const handleLogin = (e) => {
        e.preventDefault();

        // 로컬 스토리지에서 저장된 사용자 정보 가져오기
        const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};

        // 로컬 스토리지에서 저장된 사용자 정보와 입력된 사용자 정보 비교
        if (userData.userId === storedUserData.userId && userData.pw === storedUserData.pw) {
            // 로그인 성공 시 메인 페이지로 이동
            navigate('/');
        } else {
            // 일치하지 않는 경우 알림 표시 또는 다른 처리
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div>
            <form className="login" onSubmit={handleLogin}>
                <div className="mb-login-title">로그인</div>
                <InputUser userData={userData} handleChange={handleChange} />

                <div className="non-user">
                    <div className="search">
                        <Link to={'/SearchId'}>
                            <span>아이디</span>
                        </Link>
                        <span>|</span>
                        <Link to={'/SearchPw'}>
                            <span>비밀번호 찾기</span>
                        </Link>
                    </div>
                    <Link to={'/SignUp'}>
                        <span className="signUp">회원가입</span>
                    </Link>
                </div>

                <button className="login-btn" type="submit">
                    <span>로그인</span>
                </button>
            </form>
        </div>
    );
}

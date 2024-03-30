import React, { useState } from 'react';

import '../styles/signUp.scss';

export default function SignUp() {
    const [userData, setUserData] = useState({
        pw: '',
        pwCheck: '',
    });

    const [selectedDomain, setSelectedDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');

    const { pw, pwCheck } = userData;

    // 비밀번호와 비밀번호 확인이 같은지 확인하는 함수
    const checkPw = pw === pwCheck;

    // 비밀번호 입력 시 상태 업데이트
    const handlePwChange = (e) => {
        setUserData({
            ...userData,
            pw: e.target.value,
        });
    };

    // 비밀번호 확인 입력 시 상태 업데이트
    const handlePwCheckChange = (e) => {
        setUserData({
            ...userData,
            pwCheck: e.target.value,
        });
    };

    const handleDomainChange = (e) => {
        const { value } = e.target;
        if (value !== 'type') {
            setSelectedDomain(value);
            setCustomDomain('');
        } else {
            setSelectedDomain('');
        }
    };

    return (
        <div className="sign-up">
            <form>
                <div className="mb-signUp-title">회원가입</div>
                <div className="input-user-info">
                    <input className="signup-user-id" type="text" placeholder="아이디" />
                    <div className="mb-input-pw">
                        <input
                            type="password"
                            name="pw"
                            className="input-pw"
                            value={pw}
                            onChange={handlePwChange}
                            placeholder="비밀번호를 입력해 주세요."
                        />
                        <input
                            type="password"
                            name="pwCheck"
                            className="input-pw"
                            value={pwCheck}
                            onChange={handlePwCheckChange}
                            placeholder="비밀번호를 한번 더 입력해 주세요."
                        />
                        {!checkPw && pwCheck !== '' && <p className="error-pw">&#42; 비밀번호가 일치하지 않습니다.</p>}
                    </div>

                    <input type="text" className="user-name" placeholder="이름" />

                    <input className="user-nickname" type="text" placeholder="닉네임" />

                    <div className="user-email">
                        <input type="text" className="email-front" placeholder="이메일" />
                        <span>@</span>
                        <input type="text" className="domain-text" />

                        <select className="domain-list" onChange={handleDomainChange}>
                            <option value="type">직접 입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="google.com">google.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="nate.com">nate.com</option>
                            <option value="kakao.com">kakao.com</option>
                        </select>
                    </div>
                </div>

                <button className="signup-btn" type="submit">
                    <span>회원가입</span>
                </button>
            </form>
        </div>
    );
}

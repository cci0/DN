import React, { useState } from 'react';

import '../styles/signUp.scss';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');

    const navigate = useNavigate();

    // 비밀번호와 비밀번호 확인이 같은지 확인하는 함수
    const checkPw = pw === pwCheck;

    const handleDomainChange = (e) => {
        const { value } = e.target;
        if (value !== 'type') {
            setDomain(value);
        } else {
            setDomain('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 각 필드가 비어 있는지 확인
        if (!userId || !pw || !pwCheck || !name || !nickname || !email || !domain) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (pw !== pwCheck) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        // 제출 후에는 입력된 데이터를 초기화
        setUserId('');
        setPw('');
        setPwCheck('');
        setName('');
        setNickname('');
        setEmail('');
        setDomain('');

        // 로컬 스토리지에 데이터 저장
        const userData = { userId, pw, pwCheck, name, nickname, email, domain };
        localStorage.setItem('userData', JSON.stringify(userData));

        navigate('/Login');
    };

    return (
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <div className="mb-signUp-title">회원가입</div>
                <div className="input-user-info">
                    <input
                        className="signup-user-id"
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <div className="mb-input-pw">
                        <input
                            type="password"
                            name="pw"
                            className="input-pw"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            placeholder="비밀번호를 입력해 주세요."
                        />
                        <input
                            type="password"
                            name="pwCheck"
                            className="input-pw"
                            value={pwCheck}
                            onChange={(e) => setPwCheck(e.target.value)}
                            placeholder="비밀번호를 한번 더 입력해 주세요."
                        />
                        {!checkPw && pwCheck !== '' && <p className="error-pw">&#42; 비밀번호가 일치하지 않습니다.</p>}
                    </div>

                    <input
                        type="text"
                        className="user-name"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="user-nickname"
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />

                    <div className="user-email">
                        <input
                            type="text"
                            className="email-front"
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>@</span>
                        <input type="text" className="domain-text" onChange={handleDomainChange} value={domain} />

                        <select className="domain-list" onChange={handleDomainChange} value={domain}>
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

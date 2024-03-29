// InputUserId 컴포넌트
import React from 'react';

import '../styles/inputUser.scss';

export default function InputUserId({ setUserId, setUserName, setEmail }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userId') {
            setUserId(value);
        } else if (name === 'userName') {
            setUserName(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    return (
        <div className="mb-input-user">
            <input type="text" name="userId" className="user-id" placeholder="아이디" onChange={handleInputChange} />
            <input type="text" name="userName" className="user-name" placeholder="이름" onChange={handleInputChange} />
            <div className="user-email">
                <input
                    type="text"
                    name="email"
                    className="email-front"
                    placeholder="이메일"
                    onChange={handleInputChange}
                />
                <span>@</span>
                <input type="text" className="domain-text" />
                <select className="domain-list">
                    <option value="type">직접 입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="google.com">google.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="nate.com">nate.com</option>
                    <option value="kakao.com">kakao.com</option>
                </select>
            </div>
        </div>
    );
}

import React from 'react';

import '../styles/inputUser.scss';

export default function InputUser({ userData, handleChange }) {
    return (
        <div className="mb-input-user">
            <input
                className="user-id"
                type="text"
                name="userId"
                value={userData.userId}
                onChange={handleChange}
                placeholder="아이디"
            />
            <input
                className="user-pw"
                type="password"
                name="pw"
                value={userData.pw}
                onChange={handleChange}
                placeholder="비밀번호"
            />
        </div>
    );
}

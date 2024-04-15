import React from 'react';

import '../styles/inputUser.scss';

export default function InputUser() {
    return (
        <div className="mb-input-user">
            <input className="user-id" type="text" placeholder="아이디" />
            <input className="user-pw" type="password" placeholder="비밀번호" />
        </div>
    );
}

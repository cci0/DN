// InputUserId 컴포넌트
import React from 'react';
import InputEmail from './InputEmail';

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
            <InputEmail />
        </div>
    );
}

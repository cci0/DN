import React, { useState } from 'react';

import '../styles/inputUser.scss';

export default function InputUser() {
    const [selectedDomain, setSelectedDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');

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
        <div>
            <div className="mb-input-user">
                <input type="text" className="user-name" placeholder="이름" />
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
        </div>
    );
}

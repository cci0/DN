import React, { useState } from 'react';

import '../styles/inputPw.scss';

export default function InputPw() {
    const [userData, setUserData] = useState({
        pw: '',
        pwCheck: '',
    });

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

    return (
        <div className="mb-input-pw">
            <input
                type="password"
                name="pw"
                className="input-pw"
                value={pw}
                onChange={handlePwChange}
                placeholder="새 비밀번호를 입력해 주세요."
            />
            <input
                type="password"
                name="pwCheck"
                className="input-pw"
                value={pwCheck}
                onChange={handlePwCheckChange}
                placeholder="새 비밀번호를 한번 더 입력해 주세요."
            />
            {!checkPw && pwCheck !== '' && <p className="error-pw">&#42; 비밀번호가 일치하지 않습니다.</p>}
        </div>
    );
}

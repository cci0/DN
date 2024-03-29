import React from 'react';

import InputPw from '../components/InputPw';

import '../styles/changePw.scss';

export default function ChangePw() {
    return (
        <div>
            <form>
                <div className="mb-changePw-title">비밀번호 재설정</div>

                <InputPw />

                <button className="change-btn">
                    <span>비밀번호 변경</span>
                </button>
            </form>
        </div>
    );
}

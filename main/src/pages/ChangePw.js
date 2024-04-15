import React from 'react';

import InputPw from '../components/InputPw';

import '../styles/changePw.scss';
import { useNavigate } from 'react-router-dom';

export default function ChangePw() {
    const navigate = useNavigate();

    return (
        <div>
            <form className="change-pw">
                <div className="mb-changePw-title">비밀번호 재설정</div>

                <InputPw />

                <button className="change-btn">
                    <span>비밀번호 변경</span>
                </button>
            </form>

            <div className="back-login" onClick={() => navigate('/Login')}>
                로그인 하기
            </div>
        </div>
    );
}

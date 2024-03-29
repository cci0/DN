import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/login.scss';

export default function Login() {
    return (
        <div>
            <form>
                <div className="mb-login-title">로그인</div>
                <div className="mb-input-user">
                    <input className="user-id" type="text" placeholder="아이디" />
                    <input className="user-pw" type="password" placeholder="비밀번호" />
                </div>

                <div className="non-user">
                    <div className="search">
                        <Link to={'/SearchId'}>
                            <span>아이디</span>
                        </Link>
                        <span>|</span>
                        <Link to={'/SearchPw'}>
                            <span>비밀번호 찾기</span>
                        </Link>
                    </div>
                    <Link to={'/SignUp'}>
                        <span className="signUp">회원가입</span>
                    </Link>
                </div>

                <button className="login-btn" type="submit">
                    <span>로그인</span>
                </button>
            </form>
        </div>
    );
}

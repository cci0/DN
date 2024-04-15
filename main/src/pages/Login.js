import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/login.scss';
import InputUser from '../components/InputUser';

export default function Login() {
    return (
        <div>
            <form className="login">
                <div className="mb-login-title">로그인</div>
                <InputUser />

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

import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/searchPw.scss';
import InputUserId from '../components/InputUserId';

export default function SearchPw() {
    return (
        <div>
            <form>
                <div className="mb-Search-title">
                    <Link to={'/SearchId'}>
                        <span>아이디 찾기</span>
                    </Link>
                    <span>|</span>
                    <Link to={'/SearchPw'}>
                        <span className="mb-search-pw">비밀번호 찾기</span>
                    </Link>
                </div>

                {/* 이름 및 이메일 input */}

                <InputUserId />

                <button className="searchId-btn" type="submit">
                    <span>비밀번호 찾기</span>
                </button>
            </form>
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/myPage.scss';

export default function Mypage() {
    return (
        <div className="mb-mypage">
            <div className="mb-mypage-title">마이페이지</div>
            <Link to={'/MyPage:id'}>
                <div className="mypage-list">
                    <div className="mb-my-info">내 정보 관리</div>
                    <div className="arrow-next">&gt;</div>
                </div>
            </Link>

            <div className="mypage-list">
                <div className="change-theme">테마 변경</div>
                <div className="arrow-next">&gt;</div>
            </div>
            <div className="mypage-list">
                <div className="notice">공지사항</div>
                <div className="arrow-next">&gt;</div>
            </div>

            <div className="withdrow">
                <span className="withdrow-text">회원탈퇴</span>
            </div>
        </div>
    );
}

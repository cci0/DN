import '../styles/searchId.scss';

import { Link, useNavigate } from 'react-router-dom';

import InputName from '../components/InputName';
import InputEmail from '../components/InputEmail';

export default function SearchId() {
    const navigate = useNavigate();

    return (
        <div>
            <form className="serch-id">
                <div className="mb-Search-title">
                    <Link to={'/SearchId'}>
                        <span className="mb-search-id">아이디 찾기</span>
                    </Link>
                    <span>|</span>
                    <Link to={'/SearchPw'}>
                        <span>비밀번호 찾기</span>
                    </Link>
                </div>

                {/* 이름 및 이메일 input */}
                <div className="mb-input-user">
                    <InputName />
                    <InputEmail />
                </div>

                <button className="searchId-btn" type="submit">
                    <span>아이디 찾기</span>
                </button>
            </form>

            <div className="back-login" onClick={() => navigate('/Login')}>
                로그인 하기
            </div>
        </div>
    );
}

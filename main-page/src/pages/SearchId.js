import '../styles/searchId.scss';
import { Link } from 'react-router-dom';

import InputUser from '../components/InputUser';

export default function SearchId() {
    return (
        <div>
            <form>
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
                <InputUser />

                <button className="searchId-btn" type="submit">
                    <span>아이디 찾기</span>
                </button>
            </form>
        </div>
    );
}

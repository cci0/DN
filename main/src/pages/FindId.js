import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FindId() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('id');

    return (
        <div>
            <div>회원님의 아이디는 아래와 같습니다.</div>
            {keyword && <div>{keyword}</div>}
        </div>
    );
}

import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export default function FindId() {
    console.log('useParams', useParams);
    const { id } = useParams();

    const [searchParams, setSerchParmas] = useSearchParams();
    const keyword = searchParams.get('id');

    return (
        <div>
            <div>회원님의 아이디는 아래와 같습니다.</div>
            {keyword && <div>{keyword}</div>}
        </div>
    );
}

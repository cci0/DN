import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1>404 NOT FOUND</h1>
            <Link to="/">Main으로 돌아가기</Link>
        </div>
    );
}

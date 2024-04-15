import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/menuBar.scss';

export default function MenuBar() {
    return (
        <div className="menuBar">
            <nav>
                <ul className="mb-bottom-menu">
                    <li className="bottom-menu-list">
                        <Link to={'/Calendar'}>
                            <img src={process.env.PUBLIC_URL + '/icons/calendar-days.svg'} alt="calendar" />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/TodoList'}>
                            <img src={process.env.PUBLIC_URL + '/icons/list-todo.svg'} alt="todoList" />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'}>
                            <img src={process.env.PUBLIC_URL + '/icons/home.svg'} alt="home" />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/MyDiary'}>
                            <img src={process.env.PUBLIC_URL + '/icons/book-heart.svg'} alt="mydiary" />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/MyPage'}>
                            <img src={process.env.PUBLIC_URL + '/icons/user-round-cog.svg'} alt="mypage" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

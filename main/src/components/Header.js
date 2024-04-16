import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logoPng from '../images/Logo2.png';

import '../styles/header.scss';

export default function Header() {
    const [mbSidebar, setMbSidebar] = useState(false);

    const toggleMbSidebar = () => {
        setMbSidebar(!mbSidebar);
    };

    const closeMbSidebar = () => {
        setMbSidebar(false); // 모바일 사이드바를 닫음
    };

    return (
        <header className="header">
            <nav className="navBar">
                {/* 모바일 버전 */}
                <div className="mb-header">
                    <Link to={'/'}>
                        <img className="mb-oddLogo" src={logoPng} alt="Logo" />
                    </Link>

                    <div className="mb-hamburger-menu" onClick={toggleMbSidebar}>
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                </div>
                {/* 모바일 사이드 바 */}
                {mbSidebar && (
                    <div className="mb-sidebar">
                        <ul className="mb-sidebar-menu">
                            {/* <li onClick={closeMbSidebar}>
                                <Link to={'/Login'}>
                                    <img src={process.env.PUBLIC_URL + '/icons/user-round.svg'} alt="Login" />
                                    <span>로그인</span>
                                </Link>
                            </li>
                            <li onClick={closeMbSidebar}>
                                <Link to={'/Signup'}>
                                    <img src={process.env.PUBLIC_URL + '/icons/user-round-cog.svg'} alt="SignUp" />
                                    <span>회원가입</span>
                                </Link>
                            </li> */}
                            <li onClick={closeMbSidebar}>
                                <Link to={'/Calendar'}>
                                    <img src={process.env.PUBLIC_URL + '/icons/calendar-days.svg'} alt="Calendar" />
                                    <span>캘린더</span>
                                </Link>
                            </li>
                            <li onClick={closeMbSidebar}>
                                <Link to={'/TodoList'}>
                                    <img src={process.env.PUBLIC_URL + '/icons/list-todo.svg'} alt="TodoList" />
                                    <span>Todo List</span>
                                </Link>
                            </li>
                            <li onClick={closeMbSidebar}>
                                <Link to={'/MyDiary'}>
                                    <img src={process.env.PUBLIC_URL + '/icons/book-heart.svg'} alt="Diary" />
                                    <span>나의 일기장</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

            <nav className="pc-navBar">
                {/* pc 버전 */}

                <Link to={'/'}>
                    <img className="pc-oddLogo" src={logoPng} alt="Logo" />
                </Link>

                <div className="pc-menu">
                    <Link to={'/Calendar'}>
                        <span className="pc-menu-list">캘린더</span>
                    </Link>

                    <Link to={'/TodoList'}>
                        <span className="pc-menu-list">Todo List</span>
                    </Link>

                    <Link to={'/MyDiary'}>
                        <span className="pc-menu-list">나의 일기장</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

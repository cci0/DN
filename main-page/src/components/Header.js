import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logoPng from '../images/Logo2.png';
import menuSvg from '../icons/menu.svg';
import login from '../icons/user-round.svg';
import signup from '../icons/user-round-cog.svg';
import calendar from '../icons/calendar-days.svg';
import todo from '../icons/list-todo.svg';
import diary from '../icons/book-heart.svg';

import '../styles/header.scss';

export default function Header() {
    const [mbSidebar, setmbSidebar] = useState(false);
    const toggleMbSidebar = () => {
        setmbSidebar(!mbSidebar);
    };

    return (
        <header className="header">
            <nav className="navBar">
                {/* 모바일 버전 */}
                <div className="mb-header">
                    <Link to={'/'}>
                        <img className="mb-oddLogo" src={logoPng} alt="Loge" />
                    </Link>

                    <div className="mb-hamburger-menu" onClick={toggleMbSidebar}>
                        <img src={menuSvg} alt="menu" />
                    </div>
                </div>
                {/* 모바일 사이드 바 */}
                {mbSidebar && (
                    <div className="mb-sidebar">
                        <ul className="mb-sidebar-menu">
                            <li>
                                <Link to={'/Login'}>
                                    <img src={login} alt="Login" />
                                    <span>로그인</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/Signup'}>
                                    <img src={signup} alt="SignUp" />
                                    <span>회원가입</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/Calender'}>
                                    <img src={calendar} alt="Calendar" />
                                    <span>캘린더</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/TodoList'}>
                                    <img src={todo} alt="TodoList" />
                                    <span>Todo List</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/MyDiary'}>
                                    <img src={diary} alt="Diary" />
                                    <span>나의 일기장</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}

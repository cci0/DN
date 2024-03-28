import React from 'react';
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
    return (
        <header className="header">
            <nav className="navBar">
                {/* 모바일 버전 */}

                <div className="mb-header">
                    <div>
                        <Link to={'/'}>
                            <img className="mb-oddLogo" src={logoPng} alt="Loge" />
                        </Link>
                    </div>
                    <div className="mb-hamburger-menu">
                        <img src={menuSvg} alt="menu" />
                    </div>
                </div>

                <div className="mb-sidebar">
                    <ul className="mb-sidebar-menu">
                        <li>
                            <Link to={'/Login'}>
                                <img src={login} alt="Login" />
                                로그인
                            </Link>
                        </li>
                        <li>
                            <Link to={'/Signup'}>
                                <img src={signup} alt="SignUp" />
                                회원가입
                            </Link>
                        </li>
                        <li>
                            <Link to={'/Calender'}>
                                <img src={calendar} alt="Calendar" />
                                캘린더
                            </Link>
                        </li>
                        <li>
                            <Link to={'/TodoList'}>
                                <img src={todo} alt="TodoList" />
                                Todo List
                            </Link>
                        </li>
                        <li>
                            <Link to={'/MyDiary'}>
                                <img src={diary} alt="Diary" />
                                나의 일기
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

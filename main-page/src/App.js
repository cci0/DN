import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SearchId from './pages/SearchId';
import SearchPw from './pages/SearchPw';
import ChangePw from './pages/ChangePw';
import SignUp from './pages/SignUp';
import Calendar1 from './pages/Calendar1';
import TodoList from './pages/TodoList';
import Diary from './pages/Diary';
import FindId from './pages/FindId';
import Mypage from './pages/Mypage';
import MenuBar from './components/MenuBar';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    {/* 메인 */}
                    <Route path="/" element={<MainPage />} />
                    {/* 로그인 및 회원가입 관련 */}
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SearchId" element={<SearchId />} />
                    <Route path="/FindId" element={<FindId />} />
                    <Route path="/SearchPw" element={<SearchPw />} />
                    <Route path="/ChangePw" element={<ChangePw />} />
                    <Route path="/Signup" element={<SignUp />} />
                    {/* 캘린더 */}
                    <Route path="/Calendar" element={<Calendar1 />} />
                    {/* 투두 리스트 */}
                    <Route path="/TodoList" element={<TodoList />} />
                    {/* 일기장 페이지 */}
                    <Route path="/MyDiary" element={<Diary />} />
                    {/* 마이페이지 관련 */}
                    <Route path="/MyPage" element={<Mypage />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <MenuBar />
            </BrowserRouter>
        </div>
    );
}

export default App;

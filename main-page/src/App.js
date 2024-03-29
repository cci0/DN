import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SearchId from './pages/SearchId';
import SearchPw from './pages/SearchPw';
import ChangePw from './pages/ChangePw';
import SignUp from './pages/SignUp';
import Calendar from './pages/Calendar';
import TodoList from './pages/TodoList';
import Diary from './pages/Diary';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SearchId" element={<SearchId />} />
                    <Route path="/SearchPw" element={<SearchPw />} />
                    <Route path="/ChangePw" element={<ChangePw />} />
                    <Route path="/Signup" element={<SignUp />} />
                    <Route path="/Calendar" element={<Calendar />} />
                    <Route path="/TodoList" element={<TodoList />} />
                    <Route path="/MyDiary" element={<Diary />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ProctectedRouteElement from './components/ProctectedRouteElement';
import Feed from './pages/Feed';
import React from 'react';
import { getMe, selectUsers } from './redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import LeftSidebar from './components/LeftSidebar';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(selectUsers);
  React.useEffect(() => {
    // НА ВРЕМЯ
    // @ts-ignore
    dispatch(getMe());
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="App__row">
          {loggedIn && <LeftSidebar />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/feed" element={<ProctectedRouteElement element={Feed} />} />
            <Route path="/profile/:userId" element={<ProctectedRouteElement element={Profile} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ProctectedRouteElement from './components/ProctectedRouteElement';
import Feed from './pages/Feed';
import React from 'react';
import { selectUsers, setLoggedIn, setValue } from './redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import LeftSidebar from './components/LeftSidebar';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(selectUsers);
  React.useEffect(() => {
    try {
      const checkToken = async () => {
        const res = await fetch('http://localhost:3001/users/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setLoggedIn(true));
          dispatch(setValue(data));
        }
      };

      checkToken();
    } catch (error) {
      console.log(error);
    }
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
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

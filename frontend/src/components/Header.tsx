import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, setLoggedIn } from '../redux/slices/usersSlice';
import HeaderProfile from './HeaderProfile';

const Header: React.FC = () => {
  const { loggedIn } = useSelector(selectUsers);
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to={loggedIn ? '/feed' : '/'} className="logo link">
            Логотип
          </Link>
          {loggedIn ? (
            <HeaderProfile />
          ) : pathname === '/' ? (
            <Link to="/sign-up" className="link header__link">
              Регистрация
            </Link>
          ) : (
            <Link to="/" className="link header__link">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

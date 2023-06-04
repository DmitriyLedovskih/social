import React from 'react';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUsers } from '../redux/slices/usersSlice';
import HeaderProfile from './HeaderProfile';

const Header: React.FC = () => {
  const { loggedIn } = useSelector(selectUsers);

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to={loggedIn ? '/feed' : '/'} className="logo link">
            Логотип
          </Link>
          {loggedIn && (
            <HeaderProfile />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { logout, selectUsers } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SettingsIcon } from '../assets/images/settings_icon.svg';
import { ReactComponent as LogountIcon } from '../assets/images/logount_icon.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/profile_icon.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const HeaderProfile: React.FC = () => {
  const { meUserData } = useSelector(selectUsers);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logoutHandle = () => {
    // @ts-ignore
    dispatch(logout());
    navigate('/');
  };
  if (!meUserData) {
    return pathname === '/' ? (
      <Link to="/sign-up" className="link header__link">
        Регистрация
      </Link>
    ) : (
      <Link to="/" className="link header__link">
        Войти
      </Link>
    )
  }
  return (
    <div className="header__profile" onClick={() => setIsVisible(!isVisible)}>
      <div className={`header__profile-block ${isVisible ? 'header__profile-block_active' : ''}`}>
        <span className="header__profile-name">{meUserData.firstname && meUserData.firstname}</span>
        <img
          src={meUserData.avatar && meUserData.avatar}
          alt={meUserData.avatar ? meUserData.name : 'Аватар'}
          className="header__profile-avatar"
        />
      </div>
      <div
        className={`header__profile-dropdown ${
          isVisible ? 'header__profile-dropdown_active' : ''
        } element`}>
        <Link to={`/profile/${meUserData._id && meUserData._id}`} className="header__profile-link link">
          <ProfileIcon className="header__profile-icon" />
          Профиль
        </Link>
        <Link to="/settings" className="header__profile-link link">
          <SettingsIcon className="header__profile-icon" />
          Настройки
        </Link>
        <button className="button header__profile-link" onClick={logoutHandle}>
          <LogountIcon className="header__profile-icon" />
          Выйти
        </button>
      </div>
    </div>
  );
};

export default HeaderProfile;

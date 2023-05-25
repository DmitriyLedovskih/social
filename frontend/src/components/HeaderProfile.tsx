import React from 'react';
import { selectUsers, setLoggedIn } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '../assets/images/default_avatar.png';
import { ReactComponent as SettingsIcon } from '../assets/images/settings_icon.svg';
import { ReactComponent as LogountIcon } from '../assets/images/logount_icon.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/profile_icon.svg';
import { Link, useNavigate } from 'react-router-dom';

const HeaderProfile: React.FC = () => {
  const { userData } = useSelector(selectUsers);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    fetch('http://localhost:3001/signout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          dispatch(setLoggedIn(false));
          navigate('/');

          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="header__profile" onClick={() => setIsVisible(!isVisible)}>
      <div className={`header__profile-block ${isVisible ? 'header__profile-block_active' : ''}`}>
        <span className="header__profile-name">{userData.firstname}</span>
        <img
          src={userData.avatar ? userData.avatar : defaultAvatar}
          alt={userData.avatar ? userData.name : 'Аватар'}
          className="header__profile-avatar"
        />
      </div>
      <div
        className={`header__profile-dropdown ${
          isVisible ? 'header__profile-dropdown_active' : ''
        } element`}>
        <Link to="/profile" className="header__profile-link link">
          <ProfileIcon className="header__profile-icon" />
          Профиль
        </Link>
        <Link to="/settings" className="header__profile-link link">
          <SettingsIcon className="header__profile-icon" />
          Настройки
        </Link>
        <button className="button header__profile-link" onClick={logout}>
          <LogountIcon className="header__profile-icon" />
          Выйти
        </button>
      </div>
    </div>
  );
};

export default HeaderProfile;

import React from 'react';
import { selectUsers } from '../redux/slices/usersSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

type ProfileMainInfoProps = {
  isOwner: boolean;
};

const ProfileMainInfo: React.FC<ProfileMainInfoProps> = ({ isOwner }) => {
  const { userData, meUserData } = useSelector(selectUsers);
  return (
    <div className="profile__header-column">
      <div className="profile__header-block element">
        <img src={userData.avatar} alt={userData.firstname} className="profile__header-avatar" />
        <h2 className="profile__header-name">
          {userData.firstname} {userData.lastname}
        </h2>
        {meUserData.descr ? (
          <p className="profile__header-text">{meUserData.descr}</p>
        ) : (
          isOwner && (
            <Link to="/settings" className="profile__header-link link">
              Укажите описание о себе
            </Link>
          )
        )}
        {isOwner ? (
          <Link
            to="/settings"
            className="profile__header-button button button_type_outline"
            type="button">
            Редактировать профиль
          </Link>
        ) : (
          <button className="profile__header-button button button_type_outline" type="button">
            Добавить в друзья
          </button>
        )}
      </div>
      <div className="profile__header-info element">
        {userData.info ? (
          <ul className="profile__header-list">
            {userData.birthday && (
              <li className="profile__header-item">
                <span className="profile__header-label">День рождения:</span>
                <span className="profile__header-text">{userData.birthday}</span>
              </li>
            )}
            {userData.city && (
              <li className="profile__header-item">
                <span className="profile__header-label">Город:</span>
                <span className="profile__header-text">{userData.city}</span>
              </li>
            )}
            {userData.webSite && (
              <li className="profile__header-item">
                <span className="profile__header-label">Веб-сайт:</span>
                <Link
                  to={userData.webSite}
                  className="profile__header-text profile__header-link link">
                  {userData.webSite}
                </Link>
              </li>
            )}
            {userData.maritalStatus && (
              <li className="profile__header-item">
                <span className="profile__header-label">Семейное положение:</span>
                <span className="profile__header-text">{userData.maritalStatus}</span>
              </li>
            )}
          </ul>
        ) : (
          <div className="profile__header-noInfo">
            {isOwner ? (
              <Link to="/setting" className="profile__header-link link">
                Укажите дополнительную информацию о себе
              </Link>
            ) : (
              <p className="profile__header-text">
                Пользователь не указал дополнительную информацию
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMainInfo;

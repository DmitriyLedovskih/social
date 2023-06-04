import React from 'react';
import { Link } from 'react-router-dom';
import { selectUsers } from '../redux/slices/usersSlice';
import { useSelector } from 'react-redux';
import { ReactComponent as ProfileIcon } from '../assets/images/profile_icon.svg';
import { ReactComponent as FeedIcon } from '../assets/images/feed_icon.svg';
import { ReactComponent as MessageIcon } from '../assets/images/message_icon.svg';
import { ReactComponent as FriendsIcon } from '../assets/images/friends_icon.svg';
import { ReactComponent as PhotoIcon } from '../assets/images/photo_icon.svg';
import { ReactComponent as FavoriteIcon } from '../assets/images/favorite_icon.svg';

const LeftSidebar: React.FC = () => {
  const { meUserData } = useSelector(selectUsers);
  if (!meUserData) {
    // НА ВРЕМЯ
    return <div></div>;
  }
  return (
    <aside className="left-sidebar">
      <ul className="left-sidebar__menu">
        <li className="left-sidebar__item">
          <Link
            to={`/profile/${meUserData._id}`}
            className="left-sidebar__link button button_type_element">
            <ProfileIcon className="left-sidebar__icon" />
            Профиль
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/feed" className="left-sidebar__link button button_type_element">
            <FeedIcon className="left-sidebar__icon" />
            Новости
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/message" className="left-sidebar__link button button_type_element">
            <MessageIcon className="left-sidebar__icon" />
            Мессенджер
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/friends" className="left-sidebar__link button button_type_element">
            <FriendsIcon className="left-sidebar__icon" />
            Друзья
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/photo" className="left-sidebar__link button button_type_element">
            <PhotoIcon className="left-sidebar__icon" />
            Фотографии
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/favorite" className="left-sidebar__link button button_type_element">
            <FavoriteIcon className="left-sidebar__icon" />
            Избранное
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default LeftSidebar;

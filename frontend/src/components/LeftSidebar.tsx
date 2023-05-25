import React from 'react';
import { Link } from 'react-router-dom';
import { selectUsers } from '../redux/slices/usersSlice';
import { useSelector } from 'react-redux';

const LeftSidebar: React.FC = () => {
  const { userData } = useSelector(selectUsers);
  return (
    <aside className="left-sidebar">
      <ul className="left-sidebar__menu">
        <li className="left-sidebar__item">
          <Link
            to={`/profile/${userData._id}`}
            className="left-sidebar__link button button_type_element">
            Профиль
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/feed" className="left-sidebar__link button button_type_element">
            Новости
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/message" className="left-sidebar__link button button_type_element">
            Мессенджер
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/friends" className="left-sidebar__link button button_type_element">
            Друзья
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/photo" className="left-sidebar__link button button_type_element">
            Фотографии
          </Link>
        </li>
        <li className="left-sidebar__item">
          <Link to="/favorite" className="left-sidebar__link button button_type_element">
            Избранное
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default LeftSidebar;

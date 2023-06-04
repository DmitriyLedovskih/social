import React from 'react';
import { selectUsers } from '../redux/slices/usersSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

type ProfilePhotosProps = {
  isOwner: boolean;
};
const ProfilePhotos: React.FC<ProfilePhotosProps> = ({ isOwner }) => {
  const { userData } = useSelector(selectUsers);
  return (
    <div className="profile__header-photos element">
      <h2 className="profile__header-title">{isOwner ? 'Ваши фотографии' : 'Фотографии'}</h2>
      <div
        className={`${
          userData.images && userData.images.length === 0
            ? 'profile__header-row'
            : 'profile__header-grid'
        }`}>
        {userData.images && userData.images.length !== 0 ? (
          <img
            src="https://sun4-18.userapi.com/impg/5iD1oXzkxUfqR2BQkzsawJ4scdfVC3R5tq7fAA/U8Yju7SDwC4.jpg?size=807x536&quality=96&sign=55422ada902dedda34d05fc08aad7145&c_uniq_tag=WMQSjgKsdN5ffn1k5BnHnOmJY54q_D_Me0cBtnrlz_o&type=album"
            alt=""
            className="profile__header-photo"
          />
        ) : (
          <p className="profile__header-text">
            У {isOwner ? 'вас' : 'пользователя'} нет фотографий
          </p>
        )}
      </div>
      {userData.images && userData.images.length >= 4 && (
        <Link to="/photo" className="profile__header-button button button_type_dark">
          Показать все
        </Link>
      )}
    </div>
  );
};

export default ProfilePhotos;

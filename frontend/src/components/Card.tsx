import React from 'react';
import { ReactComponent as EyeOnIcon } from '../assets/images/eye_on_icon.svg';
import { ReactComponent as DotIcon } from '../assets/images/dot_icon.svg';
import { ReactComponent as LikeIcon } from '../assets/images/like_icon.svg';
import { ReactComponent as CommentIcon } from '../assets/images/comment_icon.svg';
import { Link } from 'react-router-dom';
import { selectUsers, setValue } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

type CardProps = {
  _id: number;
  descr: string;
  image: string;
  owner: any;
  likes: any;
};

const Card: React.FC<CardProps> = ({ _id, descr, image, owner, likes }) => {
  const { userData, meUserData } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const like = () => {
    fetch(`http://localhost:3001/cards/${_id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => dispatch(setValue(data.data)))
      .catch((err) => console.log(err));
  };
  const deleteCard = () => {
    fetch(`http://localhost:3001/cards/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(err));
  };
  return (
    <article className="card element">
      <div className="card__header">
        <div className="card__author">
          <Link to={`/profile/${owner._id}`} className="card__author-link link">
            <img
              src={owner.avatar}
              alt={owner.firstname ? owner.firstname : 'Аватар'}
              className="card__author-avatar"
            />
          </Link>
          <div>
            <h2 className="card__author-title">
              <Link to={`/profile/${userData._id}`} className="card__author-link link">
                {owner.firstname}
              </Link>
            </h2>
            <p className="card__author-subtitle">вчера в 14:33</p>
          </div>
        </div>
        <div className="card__options">
          <button className="card__options-dot button button_type_element" type="button">
            <DotIcon className="card__options-icon" />
          </button>
          <ul className="card__options-list element">
            <li className="card__options-item">
              <button className="card__options-button button button_type_element" type="button">
                В избранное
              </button>
            </li>
            <li className="card__options-item">
              <button className="card__options-button button button_type_element" type="button">
                Пожаловаться
              </button>
            </li>
            {owner._id === meUserData._id && (
              <li className="card__options-item">
                <button
                  className="card__options-button button button_type_element"
                  type="button"
                  onClick={deleteCard}>
                  Удалить
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="card__body">
        {descr && <p className="card__descr">{descr}</p>}
        {image && <img src={image} alt={descr} className="card__image" />}
      </div>
      <div className="card__footer">
        <div className="card__buttons">
          <button
            className="card__button button button_type_outline button_type_element"
            type="button"
            onClick={like}>
            <LikeIcon className="card__button-icon button__icon" />
            {likes.length}
          </button>
          <button
            className="card__button button button_type_outline button_type_element"
            type="button">
            <CommentIcon className="card__button-icon button__icon" />
          </button>
        </div>
        <span className="card__view">
          <EyeOnIcon className="card__view-icon" />
          222
        </span>
      </div>
    </article>
  );
};

export default Card;

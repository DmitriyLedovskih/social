import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUsers, setValue, setLoggedIn } from '../redux/slices/usersSlice';

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(selectUsers);
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    dispatch(setValue({ ...userData, [name]: value }));
  }
  const registerFetch = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.ok) {
          dispatch(setLoggedIn(true));
          navigate('/feed');

          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-block element">
      <h2 className="form-block__title">Регистрация</h2>
      <form className="form-block__form" onSubmit={registerFetch}>
        <label className="form-block__label">
          <input
            type="text"
            className="form-block__input"
            name="firstname"
            placeholder=" "
            value={userData.firstname}
            onChange={handleChange}
          />
          <span className="form-block__text">Имя</span>
        </label>
        <label className="form-block__label">
          <input
            type="text"
            className="form-block__input"
            name="lastname"
            placeholder=" "
            value={userData.lastname}
            onChange={handleChange}
          />
          <span className="form-block__text">Фамилия</span>
        </label>
        <label className="form-block__label">
          <input
            type="email"
            className="form-block__input"
            name="email"
            placeholder=" "
            value={userData.email}
            onChange={handleChange}
          />
          <span className="form-block__text">Почта</span>
        </label>
        <label className="form-block__label">
          <input
            type="password"
            className="form-block__input"
            name="password"
            placeholder=" "
            value={userData.password}
            onChange={handleChange}
          />
          <span className="form-block__text">Пароль</span>
        </label>
        <button className="form-block__button button button_type_dark">Зарегистрироваться</button>
      </form>
      <p className="form-block__descr">
        Уже есть аккаунт?{' '}
        <Link to="/" className="link form-block__link">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

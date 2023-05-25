import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { selectUsers, setLoggedIn, setValue } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(selectUsers);
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    dispatch(setValue({ ...userData, [name]: value }));
  }
  const loginFetch = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    fetch('http://localhost:3001/signin', {
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
      .then((data) => dispatch(setValue(data.data)))
      .catch((err) => console.log(err));
  };
  return (
    <div className="form-block element">
      <h2 className="form-block__title">Вход</h2>
      <form className="form-block__form" onSubmit={loginFetch}>
        <label className="form-block__label">
          <input
            type="email"
            className="form-block__input"
            name="email"
            placeholder=" "
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
            onChange={handleChange}
          />
          <span className="form-block__text">Пароль</span>
        </label>
        <label className="form-block__label form-block__label-checkbox">
          <input
            type="checkbox"
            className="form-block__input-checkbox"
            name="save-login"
            onChange={handleChange}
          />
          <button className="button form-block__button-checkbox" type="button"></button>
          Сохранить вход
        </label>
        <button className="form-block__button button button_type_dark">Войти</button>
      </form>
      <p className="form-block__descr">
        Ещё нет аккаунта?{' '}
        <Link to="/sign-up" className="link form-block__link">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

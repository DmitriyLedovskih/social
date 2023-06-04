import React from 'react';
import { ReactComponent as PhotoIcon } from '../assets/images/photo_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectCards, setCardData, setCardsData } from '../redux/slices/cardsSlice';

const AddCard: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { cardData } = useSelector(selectCards);

  function handleChange(evt: any) {
    const { name, value } = evt.target;
    dispatch(setCardData({ ...cardData, [name]: value }));
  }

  const addCard = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    fetch('http://localhost:3001/cards', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        dispatch(setCardsData(data.data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="add-card" onSubmit={addCard}>
      <textarea
        className="add-card__textarea"
        placeholder="Что нового?"
        name="descr"
        onChange={handleChange}></textarea>
      <div className="add-card__bottom">
        <ul className="add-card__bottom-list">
          <li className="add-card__bottom-item">
            <button
              className="add-card__bottom-button button"
              type="button"
              onClick={() => setIsInputVisible(!isInputVisible)}>
              <PhotoIcon className="add-card__bottom-icon" />
            </button>
            <input
              type="text"
              name="image"
              onChange={handleChange}
              className={`add-card__bottom-input ${
                isInputVisible ? 'add-card__bottom-input_active' : ''
              }`}
            />
          </li>
        </ul>
        <button className="add-card__button button button_type_primary" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
};

export default AddCard;

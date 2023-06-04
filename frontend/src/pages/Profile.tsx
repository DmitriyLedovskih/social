import React from 'react';
import { getUser, selectUsers } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import AddCard from '../components/AddCard';
import ProfileMainInfo from '../components/ProfileMainInfo';
import ProfilePhotos from '../components/ProfilePhotos';

type ProfileCard = {
  _id: number;
  descr: string;
  image: string;
  // НА ВРЕМЯ
  owner: any;
  likes: any;
};

const Profile: React.FC = () => {
  const { meUserData } = useSelector(selectUsers);
  const [cards, setCards] = React.useState([]);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isOwner = meUserData._id === userId;

  const getCards = () => {
    fetch('http://localhost:3001/cards', {
      method: 'GET',
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
      .then((data) => setCards(data.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getCards();
    //  НА ВРЕМЯ
    // @ts-ignore
    dispatch(getUser(userId));
    console.log(userId);
  }, [userId]);
  return (
    <main className="profile">
      <div className="profile__header">
        <ProfileMainInfo isOwner={isOwner} />
        <ProfilePhotos isOwner={isOwner} />
      </div>
      <div className="content">
        {isOwner && <AddCard />}
        <div className="cards">
          {cards
            ? cards.map(
                (card: ProfileCard) =>
                  card.owner._id === userId && <Card {...card} key={card._id} />,
              )
            : 'loading'}
        </div>
      </div>
    </main>
  );
};

export default Profile;

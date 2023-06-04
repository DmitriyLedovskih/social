import React from 'react';
import Card from '../components/Card';
import AddCard from '../components/AddCard';

type FeedCard = {
  _id: number;
  descr: string;
  image: string;
  owner: any;
  likes: any;
};

const Feed: React.FC = () => {
  const [cards, setCards] = React.useState([]);
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
  }, []);
  return (
    <main className="feed">
      <AddCard />
      <section className="cards">
        {cards ? cards.map((card: FeedCard) => <Card {...card} key={card._id} />) : 'loading'}
      </section>
    </main>
  );
};

export default Feed;

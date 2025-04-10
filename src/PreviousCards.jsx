import React, { useEffect, useState } from 'react';
import IDCard from './components/IDCard';

const LOCAL_KEY = 'student_cards';

const PreviousCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setCards(JSON.parse(saved).slice(1)); // skip the most recent
    }
  }, []);

  const handleDelete = (indexToDelete) => {
    const updated = cards.filter((_, i) => i !== indexToDelete);
    setCards(updated);
    const all = JSON.parse(localStorage.getItem(LOCAL_KEY));
    all.splice(indexToDelete + 1, 1);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
      <h2 className="text-3xl font-bold text-gray-500 text-center mb-6">🗂️ Previous Cards</h2>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {cards.length === 0 ? (
          <p className="text-center">No cards found!</p>
        ) : (
          cards.map((card, i) => (
            <div key={i} className="relative">
              <IDCard data={card} template="template1" />
              <button
                onClick={() => handleDelete(i)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PreviousCards;

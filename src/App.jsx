import React, { useState, useEffect } from 'react'; 
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import TemplateSwitcher from './components/TemplateSwitcher';
import { motion } from 'framer-motion';

const LOCAL_KEY = 'student_cards';

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [template, setTemplate] = useState('template1');
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setAllCards(JSON.parse(saved));
    }
  }, []);

  const handleFormSubmit = (data) => {
    setStudentData(data);
  
    // Strip photoPreview before saving
    const { photoPreview, ...safeData } = data;
  
    const maxCards = 10;
    const updatedCards = [{ ...safeData }, ...allCards].slice(0, maxCards);
  
    setAllCards(updatedCards);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedCards));
  };
  
  

  const handleCardDownload = () => {
    alert('Card downloaded!');
  };

  const handleDeleteCard = (indexToDelete) => {
    const updated = allCards.filter((_, index) => index !== indexToDelete);
    setAllCards(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 via-slate-950 to-slate-800  p-4 flex flex-col items-center">
      <div className="relative w-full flex justify-center items-center py-10">
  <div
    className="absolute inset-0 mt-6 bg-cover bg-center filter blur-sm opacity-40"
    style={{ backgroundImage: "url('/bg.jpg')" }}
  ></div>

  <motion.h1
    initial={{ x: -200, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1, ease: 'easeOut' }}
    className="text-4xl sm:text-5xl bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 text-transparent bg-clip-text font-bold text-center relative z-10"
  >
    <span className="text-yellow-300">{'\u2728'}</span>
    Smart Student ID Generator
    <span className="text-yellow-300">{'\u2728'}</span>
    <div className='font-semibold text-xl sm:text-2xl md:text-3xl mt-2'>
      Generate. Scan. Go.
    </div>
  </motion.h1>
</div>


      <div className="w-full max-w-4xl md:px-4">
        {!studentData && (
          <StudentForm onSubmit={handleFormSubmit} />
        )}

        {studentData && (
          <>
            <div className='flex flex-col items-center justify-center'>
              <TemplateSwitcher selected={template} onChange={setTemplate} />
              <IDCard data={studentData} template={template} onDownload={handleCardDownload} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
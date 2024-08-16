'use client';

import { useState } from 'react';
import { query, where, getDocs, addDoc } from 'firebase/firestore';
import flashcardsSetRef from '@/firebase/firebase';
import { useUser } from '@clerk/nextjs';

type FlashcardProps = {
  flashcard: {
    front: string;
    back: string;
  };
};

export default function Flashcard({ flashcard }: FlashcardProps) {
  const { isLoaded, isSignedIn, user } = useUser();

  const [name, setName] = useState<string>('');
  const [added, setAdded] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const flaschard = {
    userId: user?.id,
    front: flashcard.front,
    back: flashcard.back,
    date: new Date(),
  };

  const handleClick = async () => {
    try {
      const res = await addDoc(flashcardsSetRef, { ...flaschard });
      setAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border border-black rounded">
        <div>
          <div>Front: {flashcard.front}</div>
          <div>Back: {flashcard.back}</div>
        </div>
        <button
          type="button"
          className={`flex m-auto  ${
            added
              ? ''
              : 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded}'
          }`}
          onClick={handleClick}
          disabled={added ? true : false}
        >
          {!added ? 'Add to flashcard Set' : 'Added'}
        </button>
      </div>
    </>
  );
}

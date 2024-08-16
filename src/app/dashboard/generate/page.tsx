'use client';

import { useState } from 'react';

import Flashcard from '@/app/components/flashcard';

type flashcard = {
  userId: string;
  front: string;
  back: string;
  timestamp: Date;
}[];

export default function Generate() {
  const [text, setText] = useState<string>('');
  const [flashcards, setFlashcards] = useState<flashcard | null>(null);

  const handleSubmit = async () => {
    setFlashcards(null);
    const response = await fetch('/api/generate', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ prompt: text?.trim() }),
    });

    const { flashcards, error } = await response.json();
    if (response.status === 201) {
      console.log(flashcards);
      setFlashcards(flashcards);
    } else {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <p>Generate Flashcard</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Enter text"
            required={true}
            className="border border-black rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Flashcards
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {flashcards?.map((flaschard, idx) => (
          <Flashcard flashcard={flaschard} key={idx} />
        ))}
      </div>
    </>
  );
}

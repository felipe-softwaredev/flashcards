'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import flashcardsSetRef from '@/firebase/firebase';
import Flashcard from '../components/flashcard';
import {
  query,
  where,
  orderBy,
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

type FlashcardList = {
  userId: string;
  front: string;
  back: string;
  timestamp: Date;
}[];

export default function Dashboard() {
  //   const user = await currentUser();
  const { isLoaded, isSignedIn, user } = useUser();

  const [flashcardList, setFlashCardList] = useState<FlashcardList | null>(
    null
  );

  useEffect(() => {
    async function getFlashcards() {
      if (user) {
        console.log(user.id);
        const q = query(
          flashcardsSetRef,
          where('front', '==', user.id),
          orderBy('timestamp')
        );
        const querySnapshot = await getDocs(q);
        const fetchedFlashcardList: FlashcardList = querySnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            return {
              userId: data.userId,
              front: data.front,
              back: data.back,
              timestamp: data.timestamp.toDate(),
            };
          }
        );
        console.log(fetchedFlashcardList);
        // setFlashCardList(fetchedFlashcardList);
      }
    }
    getFlashcards();
  }, [user]);

  return (
    <>
      <h1>This is the dashboard</h1>
      <Link href="/dashboard/generate">Generate new flashcard list</Link>
      <div className="grid grid-cols-2 gap-2">
        {flashcardList &&
          flashcardList?.map((flaschard, idx) => (
            <Flashcard flashcard={flaschard} key={idx} />
          ))}
      </div>
    </>
  );
}

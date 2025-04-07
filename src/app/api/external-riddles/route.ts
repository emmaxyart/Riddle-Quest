import { NextResponse } from 'next/server';
import type { Riddle } from '@/types';

// Mock riddles that match your game's format
const mockRiddles: Riddle[] = [
  {
    id: 1,
    question: "What has keys, but no locks; space, but no room; and you can enter, but not go in?",
    answer: "keyboard",
    difficulty: "easy",
    points: 10,
    hint: "You use this to type on a computer",
    timeLimit: 30
  },
  {
    id: 2,
    question: "What gets wetter and wetter the more it dries?",
    answer: "towel",
    difficulty: "easy",
    points: 10,
    hint: "You use this after a shower",
    timeLimit: 30
  },
  {
    id: 3,
    question: "What has a head and a tail but no body?",
    answer: "coin",
    difficulty: "easy",
    points: 10,
    hint: "It's money that jingles in your pocket",
    timeLimit: 30
  },
  {
    id: 4,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "easy",
    points: 10,
    hint: "You put it on an envelope",
    timeLimit: 30
  },
  {
    id: 5,
    question: "What has legs but cannot walk?",
    answer: "table",
    difficulty: "easy",
    points: 10,
    hint: "You eat on it",
    timeLimit: 30
  }
];

export async function GET() {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  const RAPIDAPI_HOST = 'riddles-api.p.rapidapi.com';

  try {
    const response = await fetch('https://riddle-api.p.rapidapi.com/api/riddles/random', {
      method: 'GET',
      headers: RAPIDAPI_KEY ? {
        'X-RapidAPI-Key': '4bf0965d0bmsh88dc19b57d192b3p12dc91jsn68a0d9b13f57',
        'X-RapidAPI-Host': 'riddle-api.p.rapidapi.com',
      } : undefined,
    });

    if (!response.ok) {
      console.log('API request failed, falling back to mock riddles');
      return NextResponse.json(shuffleArray(mockRiddles));
    }

    const riddles = await response.json();

    // Map the external API format to our game's format
    const mappedRiddles = Array.isArray(riddles) ? riddles : [riddles];
    
    let formattedRiddles = mappedRiddles.map((riddle: any, index: number) => ({
      id: index + 1,
      question: riddle.riddle || riddle.title,
      answer: riddle.answer.toLowerCase().trim(),
      difficulty: 'easy',
      points: 10,
      hint: `Think about ${(riddle.riddle || riddle.title).split(' ').slice(0, 3).join(' ')}...`,
      timeLimit: 30
    }));

    // If we got fewer than 40 riddles from the API, pad with mock riddles
    if (formattedRiddles.length < 40) {
      const remainingCount = 40 - formattedRiddles.length;
      const additionalMockRiddles = shuffleArray(mockRiddles)
        .slice(0, remainingCount)
        .map((riddle, index) => ({
          ...riddle,
          id: formattedRiddles.length + index + 1
        }));
      
      formattedRiddles.push(...additionalMockRiddles);
    }

    // Ensure we only return 40 riddles even if we got more
    formattedRiddles = formattedRiddles.slice(0, 40);

    return NextResponse.json(formattedRiddles);

  } catch (error) {
    console.error('Error fetching riddles:', error);
    // Return 40 mock riddles when API fails
    return NextResponse.json(shuffleArray(mockRiddles).slice(0, 40));
  }
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}






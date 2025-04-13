import { NextResponse } from 'next/server';
import type { Riddle } from '@/types';

export async function GET() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4bf0965d0bmsh88dc19b57d192b3p12dc91jsn68a0d9b13f57',
      'X-RapidAPI-Host': 'riddle-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch('https://riddle-api.p.rapidapi.com/api/riddles/random', options);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data); // For debugging

    // Map the API response to your game's format
    const formattedRiddle: Riddle = {
      id: 1,
      question: data.riddle || data.title,
      answer: data.answer.toLowerCase().trim(),
      difficulty: 'easy',
      points: 10,
      hint: `Think about ${(data.riddle || data.title).split(' ').slice(0, 3).join(' ')}...`,
      timeLimit: 30
    };

    return NextResponse.json(formattedRiddle);

  } catch (error) {
    console.error('Error fetching riddle:', error);
    // Return a mock riddle if the API fails
    return NextResponse.json({
      id: 1,
      question: "What has keys, but no locks; space, but no room; and you can enter, but not go in?",
      answer: "keyboard",
      difficulty: "easy",
      points: 10,
      hint: "You use this to type on a computer",
      timeLimit: 30
    });
  }
}

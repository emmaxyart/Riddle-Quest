import { NextResponse } from 'next/server';

// Mock riddle data for fallback
const mockRiddles = [
  {
    title: "Computer Keyboard",
    riddle: "What has keys, but no locks; space, but no room; and you can enter, but not go in?",
    answer: "keyboard",
    category: "technology"
  },
  {
    title: "Towel",
    riddle: "What gets wetter and wetter the more it dries?",
    answer: "towel",
    category: "household"
  },
  {
    title: "Coin",
    riddle: "What has a head and a tail but no body?",
    answer: "coin",
    category: "objects"
  },
  {
    title: "Table",
    riddle: "What has legs but cannot walk?",
    answer: "table",
    category: "objects"
  },
  {
    title: "Needle",
    riddle: "What has one eye but cannot see?",
    answer: "needle",
    category: "objects"
  },
  {
    title: "Stamp",
    riddle: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    category: "objects"
  },
 
    {
      title: "Coin",
      riddle: "What has a head and a tail but no body?",
      answer: "coin",
      category: "objects"
    },
    {
      title: "Mirror",
      riddle: "You can see me in water, but I never get wet. What am I?",
      answer: "reflection",
      category: "objects"
    },
    {
      title: "Clock",
      riddle: "I have hands but no arms. I have a face but no eyes. What am I?",
      answer: "clock",
      category: "objects"
    },
    {
      title: "Towel",
      riddle: "The more you use me, the wetter I get. What am I?",
      answer: "towel",
      category: "objects"
    },
    {
      title: "Book",
      riddle: "I have many pages but I'm not a tree. What am I?",
      answer: "book",
      category: "objects"
    },
    {
      title: "Pencil",
      riddle: "I can write but I have no mouth. What am I?",
      answer: "pencil",
      category: "objects"
    },
    {
      title: "Comb",
      riddle: "I have teeth but can’t bite. What am I?",
      answer: "comb",
      category: "objects"
    },
    {
      title: "Bottle",
      riddle: "I have a neck but no head. What am I?",
      answer: "bottle",
      category: "objects"
    },
    {
      title: "Chair",
      riddle: "I have four legs but no feet. What am I?",
      answer: "chair",
      category: "objects"
    },
    {
      title: "Map",
      riddle: "I show you places but I don’t move. What am I?",
      answer: "map",
      category: "objects"
    },
    {
      title: "Shadow",
      riddle: "I follow you everywhere but can’t be touched. What am I?",
      answer: "shadow",
      category: "objects"
    },
    {
      title: "Scissors",
      riddle: "I have two blades but I’m not dangerous unless opened. What am I?",
      answer: "scissors",
      category: "objects"
    },
    {
      title: "Soap",
      riddle: "I get smaller the more you use me. What am I?",
      answer: "soap",
      category: "objects"
    },
    {
      title: "Keyboard",
      riddle: "I have keys but no locks. What am I?",
      answer: "keyboard",
      category: "objects"
    },
    {
      title: "Glasses",
      riddle: "I help you see but I’m not eyes. What am I?",
      answer: "glasses",
      category: "objects"
    },
    {
      title: "Balloon",
      riddle: "I rise but I’m not alive. What am I?",
      answer: "balloon",
      category: "objects"
    },
    {
      title: "Camera",
      riddle: "I can capture a moment but I can’t speak. What am I?",
      answer: "camera",
      category: "objects"
    },
    {
      title: "Lock",
      riddle: "You need a key to open me, but I’m not a door. What am I?",
      answer: "lock",
      category: "objects"
    },
    {
      title: "Phone",
      riddle: "I let people talk across the world. What am I?",
      answer: "phone",
      category: "objects"
    },
    {
      title: "Umbrella",
      riddle: "I protect you from the rain but I’m not a roof. What am I?",
      answer: "umbrella",
      category: "objects"
    },
    {
      title: "Fan",
      riddle: "I move air but have no wings. What am I?",
      answer: "fan",
      category: "objects"
    },
    {
      title: "Knife",
      riddle: "I’m sharp but not a wit. What am I?",
      answer: "knife",
      category: "objects"
    },
    {
      title: "Match",
      riddle: "I can start a fire but I’m very small. What am I?",
      answer: "match",
      category: "objects"
    },
    {
      title: "Clock",
      riddle: "I tick but I’m not a bomb. What am I?",
      answer: "clock",
      category: "objects"
    },
    {
      title: "Ruler",
      riddle: "I help you draw straight lines. What am I?",
      answer: "ruler",
      category: "objects"
    },
    {
      title: "Bell",
      riddle: "I ring but I’m not a phone. What am I?",
      answer: "bell",
      category: "objects"
    },
    {
      title: "Envelope",
      riddle: "I carry letters but I’m not the postman. What am I?",
      answer: "envelope",
      category: "objects"
    },
    {
      title: "Battery",
      riddle: "I give power but I’m not alive. What am I?",
      answer: "battery",
      category: "objects"
    },
    {
      title: "Lightbulb",
      riddle: "I shine when fed with power. What am I?",
      answer: "lightbulb",
      category: "objects"
    },
    {
      title: "Helmet",
      riddle: "I protect your head but I’m not hair. What am I?",
      answer: "helmet",
      category: "objects"
    }
  
  
];

export async function GET() {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  const RAPIDAPI_HOST = 'riddles-api.p.rapidapi.com';

  // If no API key, return mock data
  if (!RAPIDAPI_KEY) {
    console.log('No API key found, using mock data');
    const randomMockRiddle = mockRiddles[Math.floor(Math.random() * mockRiddles.length)];
    return NextResponse.json({
      success: true,
      data: randomMockRiddle,
      source: 'mock'
    });
  }

  try {
    const response = await fetch('https://riddles-api.p.rapidapi.com/riddles/random', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      console.log('API request failed, falling back to mock data');
      const randomMockRiddle = mockRiddles[Math.floor(Math.random() * mockRiddles.length)];
      return NextResponse.json({
        success: true,
        data: randomMockRiddle,
        source: 'mock'
      });
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      data: data,
      source: 'api'
    });

  } catch (error) {
    console.error('Error testing API:', error);
    // Return mock data on error
    const randomMockRiddle = mockRiddles[Math.floor(Math.random() * mockRiddles.length)];
    return NextResponse.json({
      success: true,
      data: randomMockRiddle,
      source: 'mock'
    });
  }
}






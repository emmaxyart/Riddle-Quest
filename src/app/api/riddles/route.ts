import { NextResponse } from 'next/server';

const easyRiddles = [
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
    question: "What has legs but cannot walk?",
    answer: "table",
    difficulty: "easy",
    points: 10,
    hint: "You eat on it",
    timeLimit: 30
  },
  {
    id: 5,
    question: "What has one eye but cannot see?",
    answer: "needle",
    difficulty: "easy",
    points: 10,
    hint: "Used for sewing",
    timeLimit: 30
  },
  {
    id: 6,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "easy",
    points: 10,
    hint: "You put it on an envelope",
    timeLimit: 30
  },
  {
    id: 7,
    question: "I have hands but no arms. I have a face but no eyes. What am I?",
    answer: "clock",
    difficulty: "easy",
    points: 10,
    hint: "I help you keep time",
    timeLimit: 30
  },
  {
    id: 8,
    question: "I have many pages but I'm not a tree. What am I?",
    answer: "book",
    difficulty: "easy",
    points: 10,
    hint: "You read me",
    timeLimit: 30
  },
  {
    id: 9,
    question: "I can write but I have no mouth. What am I?",
    answer: "pencil",
    difficulty: "easy",
    points: 10,
    hint: "I leave marks on paper",
    timeLimit: 30
  },
  {
    id: 10,
    question: "I have teeth but can't bite. What am I?",
    answer: "comb",
    difficulty: "easy",
    points: 10,
    hint: "Used for hair",
    timeLimit: 30
  },
  {
    id: 11,
    question: "I have a neck but no head. What am I?",
    answer: "bottle",
    difficulty: "easy",
    points: 10,
    hint: "You drink from me",
    timeLimit: 30
  },
  {
    id: 12,
    question: "I show you places but I don't move. What am I?",
    answer: "map",
    difficulty: "easy",
    points: 10,
    hint: "I help you navigate",
    timeLimit: 30
  },
  {
    id: 13,
    question: "I follow you everywhere but can't be touched. What am I?",
    answer: "shadow",
    difficulty: "easy",
    points: 10,
    hint: "I appear in sunlight",
    timeLimit: 30
  },
  {
    id: 14,
    question: "I get smaller the more you use me. What am I?",
    answer: "soap",
    difficulty: "easy",
    points: 10,
    hint: "I help you stay clean",
    timeLimit: 30
  },
  {
    id: 15,
    question: "I help you see but I'm not eyes. What am I?",
    answer: "glasses",
    difficulty: "easy",
    points: 10,
    hint: "Worn on your face",
    timeLimit: 30
  },
  {
    id: 16,
    question: "I rise but I'm not alive. What am I?",
    answer: "balloon",
    difficulty: "easy",
    points: 10,
    hint: "Filled with air",
    timeLimit: 30
  },
  {
    id: 17,
    question: "I can capture a moment but I can't speak. What am I?",
    answer: "camera",
    difficulty: "easy",
    points: 10,
    hint: "Takes pictures",
    timeLimit: 30
  },
  {
    id: 18,
    question: "You need a key to open me, but I'm not a door. What am I?",
    answer: "lock",
    difficulty: "easy",
    points: 10,
    hint: "Keeps things secure",
    timeLimit: 30
  },
  {
    id: 19,
    question: "I protect you from the rain but I'm not a roof. What am I?",
    answer: "umbrella",
    difficulty: "easy",
    points: 10,
    hint: "Keeps you dry",
    timeLimit: 30
  },
  {
    id: 20,
    question: "I move air but have no wings. What am I?",
    answer: "fan",
    difficulty: "easy",
    points: 10,
    hint: "Keeps you cool",
    timeLimit: 30
  },
  {
    id: 21,
    question: "I'm sharp but not a wit. What am I?",
    answer: "knife",
    difficulty: "easy",
    points: 10,
    hint: "Found in the kitchen",
    timeLimit: 30
  },
  {
    id: 22,
    question: "I can start a fire but I'm very small. What am I?",
    answer: "match",
    difficulty: "easy",
    points: 10,
    hint: "Creates a flame",
    timeLimit: 30
  },
  {
    id: 23,
    question: "I help you draw straight lines. What am I?",
    answer: "ruler",
    difficulty: "easy",
    points: 10,
    hint: "Measuring tool",
    timeLimit: 30
  },
  {
    id: 24,
    question: "I ring but I'm not a phone. What am I?",
    answer: "bell",
    difficulty: "easy",
    points: 10,
    hint: "Makes a ding sound",
    timeLimit: 30
  },
  {
    id: 25,
    question: "I carry letters but I'm not the postman. What am I?",
    answer: "envelope",
    difficulty: "easy",
    points: 10,
    hint: "Paper container",
    timeLimit: 30
  },
  {
    id: 26,
    question: "I give power but I'm not alive. What am I?",
    answer: "battery",
    difficulty: "easy",
    points: 10,
    hint: "Stores electricity",
    timeLimit: 30
  },
  {
    id: 27,
    question: "I shine when fed with power. What am I?",
    answer: "lightbulb",
    difficulty: "easy",
    points: 10,
    hint: "Illuminates rooms",
    timeLimit: 30
  },
  {
    id: 28,
    question: "I protect your head but I'm not hair. What am I?",
    answer: "helmet",
    difficulty: "easy",
    points: 10,
    hint: "Safety gear",
    timeLimit: 30
  },
  {
    id: 29,
    question: "I have two hands and a face, but no arms or legs. What am I?",
    answer: "clock",
    difficulty: "easy",
    points: 10,
    hint: "Tells time",
    timeLimit: 30
  },
  {
    id: 30,
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "candle",
    difficulty: "easy",
    points: 10,
    hint: "Burns and melts",
    timeLimit: 30
  },
  {
    id: 31,
    question: "I'm black when I'm clean, but white when I'm dirty. What am I?",
    answer: "chalkboard",
    difficulty: "easy",
    points: 10,
    hint: "Writes on it",
    timeLimit: 30
  },
  {
    id: 32,
    question: "I'm always hungry, but I can't eat. What am I?",
    answer: "fire",
    difficulty: "easy",
    points: 10,
    hint: "Consumes fuel",
    timeLimit: 30
  },
  {
    id: 33,
    question: "I'm full of holes but I can still hold water. What am I?",
    answer: "sponge",
    difficulty: "easy",
    points: 10,
    hint: "Absorbs liquids",
    timeLimit: 30
  },
  {
    id: 34,
    question: "I'm always in front, but never behind. What am I?",
    answer: "future",
    difficulty: "easy",
    points: 10,
    hint: "Time related",
    timeLimit: 30
  },
  {
    id: 35,
    question: "I'm light as a feather, yet the strongest person can't hold me for long. What am I?",
    answer: "breath",
    difficulty: "easy",
    points: 10,
    hint: "You need it to live",
    timeLimit: 30
  },
  {
    id: 36,
    question: "I'm something you can see, but never touch. What am I?",
    answer: "reflection",
    difficulty: "easy",
    points: 10,
    hint: "You see it in water",
    timeLimit: 30
  },
  {
    id: 37,
    question: "I'm always running, but never get anywhere. What am I?",
    answer: "river",
    difficulty: "easy",
    points: 10,
    hint: "Flows continuously",
    timeLimit: 30
  },
  {
    id: 38,
    question: "I'm always in the past, but never in the present. What am I?",
    answer: "memory",
    difficulty: "easy",
    points: 10,
    hint: "Remembers things",
    timeLimit: 30
  },
  {
    id: 39,
    question: "I'm always in the future, but never in the present. What am I?",
    answer: "hope",
    difficulty: "easy",
    points: 10,
    hint: "Future oriented",
    timeLimit: 30
  },
  {
    id: 40,
    question: "I'm always in the present, but never in the future. What am I?",
    answer: "now",
    difficulty: "easy",
    points: 10,
    hint: "Current time",
    timeLimit: 30
  },
  {
    id: 25,
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "candle",
    difficulty: "easy",
    points: 10,
    hint: "I provide light",
    timeLimit: 30
  },
  {
    id: 26,
    question: "What has keys that open no doors, space but no room, and you can enter but not go in?",
    answer: "keyboard",
    difficulty: "easy",
    points: 10,
    hint: "Used with computers",
    timeLimit: 30
  },
  {
    id: 27,
    question: "What gets broken without being held?",
    answer: "promise",
    difficulty: "easy",
    points: 10,
    hint: "It's not physical",
    timeLimit: 30
  },
  {
    id: 28,
    question: "What can run but never walks, has a mouth but never talks?",
    answer: "river",
    difficulty: "easy",
    points: 10,
    hint: "Found in nature",
    timeLimit: 30
  },
  {
    id: 29,
    question: "What has a head and a tail that will never meet?",
    answer: "coin",
    difficulty: "easy",
    points: 10,
    hint: "Used as currency",
    timeLimit: 30
  },
  {
    id: 30,
    question: "What has cities, but no houses; forests, but no trees; and rivers, but no water?",
    answer: "map",
    difficulty: "easy",
    points: 10,
    hint: "Used for navigation",
    timeLimit: 30
  },
  {
    id: 31,
    question: "What is always in front of you but can't be seen?",
    answer: "future",
    difficulty: "easy",
    points: 10,
    hint: "Time related",
    timeLimit: 30
  },
  {
    id: 32,
    question: "What can fill a room but takes up no space?",
    answer: "light",
    difficulty: "easy",
    points: 10,
    hint: "Helps you see",
    timeLimit: 30
  },
  {
    id: 33,
    question: "What goes up but never comes down?",
    answer: "age",
    difficulty: "easy",
    points: 10,
    hint: "Everyone has it",
    timeLimit: 30
  },
  {
    id: 34,
    question: "What can be cracked, made, told, and played?",
    answer: "joke",
    difficulty: "easy",
    points: 10,
    hint: "Makes people laugh",
    timeLimit: 30
  },
  {
    id: 35,
    question: "What has words, but never speaks?",
    answer: "book",
    difficulty: "easy",
    points: 10,
    hint: "Found in libraries",
    timeLimit: 30
  },
  {
    id: 36,
    question: "What runs all around a backyard, yet never moves?",
    answer: "fence",
    difficulty: "easy",
    points: 10,
    hint: "Marks boundaries",
    timeLimit: 30
  },
  {
    id: 37,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "easy",
    points: 10,
    hint: "Used on mail",
    timeLimit: 30
  },
  {
    id: 38,
    question: "What has many teeth but cannot bite?",
    answer: "comb",
    difficulty: "easy",
    points: 10,
    hint: "Used for grooming",
    timeLimit: 30
  },
  {
    id: 39,
    question: "What has banks but no money?",
    answer: "river",
    difficulty: "easy",
    points: 10,
    hint: "Flows with water",
    timeLimit: 30
  },
  {
    id: 40,
    question: "What can be thrown but not caught?",
    answer: "party",
    difficulty: "easy",
    points: 10,
    hint: "A celebration",
    timeLimit: 30
  }
];

// Add medium difficulty riddles
const mediumRiddles = [
  {
    id: 101,
    question: "I'm light as a feather, but the strongest person can't hold me for more than a few minutes. What am I?",
    answer: "breath",
    difficulty: "medium",
    points: 20,
    hint: "You do this constantly without thinking",
    timeLimit: 15
  },
  {
    id: 102,
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    difficulty: "medium",
    points: 20,
    hint: "Think about walking",
    timeLimit: 15
  },
  {
    id: 103,
    question: "What has a head, a tail, is brown, and has no legs?",
    answer: "penny",
    difficulty: "medium",
    points: 20,
    hint: "It's a type of currency",
    timeLimit: 15
  },
  {
    id: 104,
    question: "What building has the most stories?",
    answer: "library",
    difficulty: "medium",
    points: 20,
    hint: "Books are kept here",
    timeLimit: 15
  },
  {
    id: 105,
    question: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    answer: "river",
    difficulty: "medium",
    points: 20,
    hint: "It's a natural water feature",
    timeLimit: 15
  },
  {
    id: 106,
    question: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
    answer: "pencil lead",
    difficulty: "medium",
    points: 20,
    hint: "Think about writing instruments",
    timeLimit: 15
  },
  {
    id: 107,
    question: "What goes up but never comes down?",
    answer: "age",
    difficulty: "medium",
    points: 20,
    hint: "Everyone has this and it only increases",
    timeLimit: 15
  },
  {
    id: 108,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "medium",
    points: 20,
    hint: "Used for mail",
    timeLimit: 15
  },
  {
    id: 109,
    question: "What has 13 hearts but no other organs?",
    answer: "deck of cards",
    difficulty: "medium",
    points: 20,
    hint: "Used for games",
    timeLimit: 15
  },
  {
    id: 110,
    question: "What has a neck but no head?",
    answer: "bottle",
    difficulty: "medium",
    points: 20,
    hint: "Used for storing liquids",
    timeLimit: 15
  },
  {
    id: 111,
    question: "What gets wetter as it dries?",
    answer: "towel",
    difficulty: "medium",
    points: 20,
    hint: "Used after bathing",
    timeLimit: 15
  },
  {
    id: 112,
    question: "What has words but never speaks?",
    answer: "book",
    difficulty: "medium",
    points: 20,
    hint: "Contains stories and information",
    timeLimit: 15
  },
  {
    id: 113,
    question: "What has a thumb and four fingers but is not alive?",
    answer: "glove",
    difficulty: "medium",
    points: 20,
    hint: "Worn on hands",
    timeLimit: 15
  },
  {
    id: 114,
    question: "What has cities but no houses, forests but no trees, and rivers but no water?",
    answer: "map",
    difficulty: "medium",
    points: 20,
    hint: "Used for navigation",
    timeLimit: 15
  },
  {
    id: 115,
    question: "What can fill a room but takes up no space?",
    answer: "light",
    difficulty: "medium",
    points: 20,
    hint: "Helps you see",
    timeLimit: 15
  },
  {
    id: 116,
    question: "I have keys but no locks. I have space but no room. You can enter, but you can't go inside. What am I?",
    answer: "keyboard",
    difficulty: "medium",
    points: 20,
    hint: "You use this to type",
    timeLimit: 15
  },
  {
    id: 117,
    question: "What has a neck but no head, two arms but no hands?",
    answer: "shirt",
    difficulty: "medium",
    points: 20,
    hint: "You wear this every day",
    timeLimit: 15
  },
  {
    id: 118,
    question: "What gets bigger when more is taken away?",
    answer: "hole",
    difficulty: "medium",
    points: 20,
    hint: "Think about digging",
    timeLimit: 15
  },
  {
    id: 119,
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "candle",
    difficulty: "medium",
    points: 20,
    hint: "I provide light",
    timeLimit: 15
  },
  {
    id: 120,
    question: "What has many keys but can't open a single lock?",
    answer: "piano",
    difficulty: "medium",
    points: 20,
    hint: "It's a musical instrument",
    timeLimit: 15
  },
  {
    id: 121,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "medium",
    points: 20,
    hint: "Used for mail",
    timeLimit: 15
  },
  {
    id: 122,
    question: "What has 13 hearts but no other organs?",
    answer: "deck of cards",
    difficulty: "medium",
    points: 20,
    hint: "Used for games",
    timeLimit: 15
  },
  {
    id: 123,
    question: "What has words but never speaks?",
    answer: "book",
    difficulty: "medium",
    points: 20,
    hint: "You read it",
    timeLimit: 15
  },
  {
    id: 124,
    question: "What runs but never walks, has a mouth but never talks?",
    answer: "river",
    difficulty: "medium",
    points: 20,
    hint: "Found in nature",
    timeLimit: 15
  },
  {
    id: 125,
    question: "What can be cracked, made, told, and played?",
    answer: "joke",
    difficulty: "medium",
    points: 20,
    hint: "Makes people laugh",
    timeLimit: 15
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get('difficulty');

  if (difficulty === 'easy') {
    // Shuffle the array and return exactly 40 riddles
    const shuffledRiddles = shuffleArray([...easyRiddles]);
    return NextResponse.json(shuffledRiddles);
  } else if (difficulty === 'medium') {
    // Return medium difficulty riddles
    const shuffledRiddles = shuffleArray([...mediumRiddles]);
    return NextResponse.json(shuffledRiddles);
  }

  // For other difficulties (to be implemented)
  return NextResponse.json([]);
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


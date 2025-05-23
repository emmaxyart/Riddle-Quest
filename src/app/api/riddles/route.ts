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
    id: 41,
    question: "A girl has as many brothers as sisters, but each brother has only half as many brothers as sisters. How many brothers and sisters are there in the family?",
    answer: "four sisters and three brothers",
    difficulty: "easy",
    points: 10,
    hint: "Count the siblings carefully",
    timeLimit: 30
  },
  {
    id: 42,
    question: "Two girls were born to the same mother, on the same day, at the same time, in the same month, and in the same year—but they're not twins. How is this possible?",
    answer: "triplets",
    difficulty: "easy",
    points: 10,
    hint: "There are more than two siblings",
    timeLimit: 30
  },
  {
    id: 43,
    question: "A barrel of water weighed 60 pounds. Someone put something in it, and now it weighs 40 pounds. What did the person add?",
    answer: "hole",
    difficulty: "easy",
    points: 10,
    hint: "Something that lets water out",
    timeLimit: 30
  },
  {
    id: 44,
    question: "I am an odd number. Take away a letter, and I become even. What number am I?",
    answer: "seven",
    difficulty: "easy",
    points: 10,
    hint: "Remove the 's'",
    timeLimit: 30
  },
  {
    id: 45,
    question: "TEN = 20, 5, 14. MEN = 13, 5, 14. Using the same logic, what do WOMEN equal?",
    answer: "23, 15, 13, 5, 14",
    difficulty: "easy",
    points: 10,
    hint: "Think about the alphabet position",
    timeLimit: 30
  },
  {
    id: 46,
    question: "What would a math teacher be doing with a piece of graph paper?",
    answer: "plotting something",
    difficulty: "easy",
    points: 10,
    hint: "Think about math terms",
    timeLimit: 30
  },
  {
    id: 47,
    question: "How do eight eights add up to one thousand?",
    answer: "888 + 88 + 8 + 8 + 8 = 1000",
    difficulty: "easy",
    points: 10,
    hint: "Use different combinations of 8s",
    timeLimit: 30
  },
  {
    id: 48,
    question: "Mr. Taylor has four daughters and each has a brother. In total, how many children does Mr. Taylor have?",
    answer: "five",
    difficulty: "easy",
    points: 10,
    hint: "They all share the same brother",
    timeLimit: 30
  },
  {
    id: 49,
    question: "If an electric train is moving north at 55 mph and the winds blowing east at 70 mph, which way does the smoke blow?",
    answer: "electric trains don't emit smoke",
    difficulty: "easy",
    points: 10,
    hint: "Think about the type of train",
    timeLimit: 30
  },
  {
    id: 50,
    question: "What is 3/7 chicken, 2/3 cat, and 1/2 goat?",
    answer: "chicago",
    difficulty: "easy",
    points: 10,
    hint: "Combine the letters",
    timeLimit: 30
  },
  {
    id: 51,
    question: "I belong in December, but not in any other month. I am not a holiday. What am I?",
    answer: "d",
    difficulty: "easy",
    points: 10,
    hint: "It's a letter in the word",
    timeLimit: 30
  },
  {
    id: 52,
    question: "White bird, featherless. Flying out of paradise. Flying over sea and land. Dying in my hand. What is it?",
    answer: "snowflake",
    difficulty: "easy",
    points: 10,
    hint: "It falls from the sky",
    timeLimit: 30
  },
  {
    id: 53,
    question: "What 5-letter word, if typed in all capital letters, can be read the same upside down?",
    answer: "swims",
    difficulty: "easy",
    points: 10,
    hint: "Related to water activity",
    timeLimit: 30
  },
  {
    id: 54,
    question: "How do you spell COW in thirteen letters?",
    answer: "see o double you",
    difficulty: "easy",
    points: 10,
    hint: "Spell out the letters",
    timeLimit: 30
  },
  {
    id: 55,
    question: "I'm everywhere and a part of everyone. I am at the end of space and time and existence itself. What am I?",
    answer: "e",
    difficulty: "easy",
    points: 10,
    hint: "It's a letter",
    timeLimit: 30
  },
  {
    id: 56,
    question: "What is seen in the middle of March and April that can't be seen at the beginning or end of either month?",
    answer: "r",
    difficulty: "easy",
    points: 10,
    hint: "Look at the spelling",
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
    timeLimit: 20
  },
  {
    id: 102,
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    difficulty: "medium",
    points: 20,
    hint: "Think about walking",
    timeLimit: 20
  },
  {
    id: 103,
    question: "What asks but never answers?",
    answer: "owl",
    difficulty: "medium",
    points: 20,
    hint: "A nocturnal bird",
    timeLimit: 20
  },
  {
    id: 104,
    question: "What building has the most stories?",
    answer: "library",
    difficulty: "medium",
    points: 20,
    hint: "Books are kept here",
    timeLimit: 20
  },
  {
    id: 105,
    question: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    answer: "river",
    difficulty: "medium",
    points: 20,
    hint: "It's a natural water feature",
    timeLimit: 20
  },
  {
    id: 106,
    question: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
    answer: "pencil lead",
    difficulty: "medium",
    points: 20,
    hint: "Think about writing instruments",
    timeLimit: 20
  },
  {
    id: 107,
    question: "What invention lets you look right through a wall?",
    answer: "window",
    difficulty: "medium",
    points: 20,
    hint: "Found in every house",
    timeLimit: 20
  },
  {
    id: 108,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "medium",
    points: 20,
    hint: "Used on mail",
    timeLimit: 20
  },
  {
    id: 109,
    question: "What can be cracked, made, told, and played?",
    answer: "joke",
    difficulty: "medium",
    points: 20,
    hint: "Makes people laugh",
    timeLimit: 20
  },
  {
    id: 110,
    question: "What has a ring but no finger?",
    answer: "telephone",
    difficulty: "medium",
    points: 20,
    hint: "Used for communication",
    timeLimit: 20
  },
  {
    id: 111,
    question: "What has many keys but can't open a single lock?",
    answer: "piano",
    difficulty: "medium",
    points: 20,
    hint: "A musical instrument",
    timeLimit: 20
  },
  {
    id: 112,
    question: "What gets bigger the more you take away from it?",
    answer: "hole",
    difficulty: "medium",
    points: 20,
    hint: "Think about digging",
    timeLimit: 20
  },
  {
    id: 113,
    question: "What has 13 hearts but no other organs?",
    answer: "deck of cards",
    difficulty: "medium",
    points: 20,
    hint: "Used for games",
    timeLimit: 20
  },
  {
    id: 114,
    question: "I have branches, but no fruit, trunk or leaves. What am I?",
    answer: "bank",
    difficulty: "medium",
    points: 20,
    hint: "Related to money",
    timeLimit: 20
  },
  {
    id: 115,
    question: "What has a neck but no head?",
    answer: "bottle",
    difficulty: "medium",
    points: 20,
    hint: "Holds liquids",
    timeLimit: 20
  },
  {
    id: 116,
    question: "What room can no one enter?",
    answer: "mushroom",
    difficulty: "medium",
    points: 20,
    hint: "Think about plants",
    timeLimit: 20
  },
  {
    id: 117,
    question: "What is full of holes but still holds water?",
    answer: "sponge",
    difficulty: "medium",
    points: 20,
    hint: "Used for cleaning",
    timeLimit: 20
  },
  {
    id: 118,
    question: "What has many teeth but cannot bite?",
    answer: "comb",
    difficulty: "medium",
    points: 20,
    hint: "Used for hair",
    timeLimit: 20
  },
  {
    id: 119,
    question: "What can you catch but not throw?",
    answer: "cold",
    difficulty: "medium",
    points: 20,
    hint: "Related to illness",
    timeLimit: 20
  },
  {
    id: 120,
    question: "What breaks when you say it?",
    answer: "silence",
    difficulty: "medium",
    points: 20,
    hint: "Think about sound",
    timeLimit: 20
  },
  {
    id: 121,
    question: "What goes up and down but doesn't move?",
    answer: "temperature",
    difficulty: "medium",
    points: 20,
    hint: "Weather related",
    timeLimit: 20
  },
  {
    id: 122,
    question: "What can you hold in your right hand but not in your left?",
    answer: "left hand",
    difficulty: "medium",
    points: 20,
    hint: "Think about body parts",
    timeLimit: 20
  },
  {
    id: 123,
    question: "What is always in front of you but can't be seen?",
    answer: "future",
    difficulty: "medium",
    points: 20,
    hint: "Related to time",
    timeLimit: 20
  },
  {
    id: 124,
    question: "What can you break, even if you never pick it up or touch it?",
    answer: "promise",
    difficulty: "medium",
    points: 20,
    hint: "Not a physical object",
    timeLimit: 20
  },
  {
    id: 125,
    question: "What goes up but never comes down?",
    answer: "age",
    difficulty: "medium",
    points: 20,
    hint: "Everyone has it",
    timeLimit: 20
  },
  {
    id: 126,
    question: "What can fill a room but takes up no space?",
    answer: "light",
    difficulty: "medium",
    points: 20,
    hint: "Helps you see",
    timeLimit: 20
  },
  {
    id: 127,
    question: "What five-letter word becomes shorter when you add two letters to it?",
    answer: "short",
    difficulty: "medium",
    points: 20,
    hint: "Think about word meanings",
    timeLimit: 20
  },
  {
    id: 128,
    question: "What can you keep after giving it to someone?",
    answer: "word",
    difficulty: "medium",
    points: 20,
    hint: "Related to speaking",
    timeLimit: 20
  },
  {
    id: 129,
    question: "What has a bottom at the top?",
    answer: "legs",
    difficulty: "medium",
    points: 20,
    hint: "Body parts",
    timeLimit: 20
  },
  {
    id: 130,
    question: "What has four wheels and flies?",
    answer: "garbage truck",
    difficulty: "medium",
    points: 20,
    hint: "Think about vehicles",
    timeLimit: 20
  },
  {
    id: 131,
    question: "What has cities, but no houses; forests, but no trees; and water, but no fish?",
    answer: "map",
    difficulty: "medium",
    points: 20,
    hint: "Used for navigation",
    timeLimit: 20
  },
  {
    id: 132,
    question: "What belongs to you, but others use it more than you do?",
    answer: "name",
    difficulty: "medium",
    points: 20,
    hint: "Personal identifier",
    timeLimit: 20
  },
  {
    id: 133,
    question: "The more of this there is, the less you see. What is it?",
    answer: "darkness",
    difficulty: "medium",
    points: 20,
    hint: "Opposite of light",
    timeLimit: 20
  },
  {
    id: 134,
    question: "What has hands but cannot clap?",
    answer: "clock",
    difficulty: "medium",
    points: 20,
    hint: "Tells time",
    timeLimit: 20
  },
  {
    id: 135,
    question: "What can be stolen, mistaken, or broken but never forgotten once given?",
    answer: "heart",
    difficulty: "medium",
    points: 20,
    hint: "Related to emotions",
    timeLimit: 20
  },
  {
    id: 136,
    question: "What starts with an 'e' and ends with an 'e' but only has one letter in it?",
    answer: "envelope",
    difficulty: "medium",
    points: 20,
    hint: "Used for mail",
    timeLimit: 20
  },
  {
    id: 137,
    question: "What has a face and two hands but no arms or legs?",
    answer: "clock",
    difficulty: "medium",
    points: 20,
    hint: "Tells time",
    timeLimit: 20
  },
  {
    id: 138,
    question: "What can you hold without touching it?",
    answer: "conversation",
    difficulty: "medium",
    points: 20,
    hint: "Involves talking",
    timeLimit: 20
  },
  {
    id: 139,
    question: "What kind of room has no doors or windows?",
    answer: "mushroom",
    difficulty: "medium",
    points: 20,
    hint: "Think about fungi",
    timeLimit: 20
  },
  {
    id: 140,
    question: "What is so fragile that saying its name breaks it?",
    answer: "silence",
    difficulty: "medium",
    points: 20,
    hint: "Absence of sound",
    timeLimit: 20
  },
  {
    id: 141,
    question: "What has a head, a tail, but no body?",
    answer: "coin",
    difficulty: "medium",
    points: 20,
    hint: "Used as currency",
    timeLimit: 20
  },
  {
    id: 142,
    question: "What has many needles but doesn't sew?",
    answer: "pine tree",
    difficulty: "medium",
    points: 20,
    hint: "Found in forests",
    timeLimit: 20
  },
  {
    id: 143,
    question: "What has legs but doesn't walk?",
    answer: "table",
    difficulty: "medium",
    points: 20,
    hint: "Furniture item",
    timeLimit: 20
  },
  {
    id: 144,
    question: "What has one eye but cannot see?",
    answer: "needle",
    difficulty: "medium",
    points: 20,
    hint: "Used for sewing",
    timeLimit: 20
  },
  {
    id: 145,
    question: "What gets wetter as it dries?",
    answer: "towel",
    difficulty: "medium",
    points: 20,
    hint: "Bathroom item",
    timeLimit: 20
  },
  {
    id: 146,
    question: "What can you catch but not throw?",
    answer: "cold",
    difficulty: "medium",
    points: 20,
    hint: "Related to health",
    timeLimit: 20
  },
  {
    id: 147,
    question: "What has a bottom at the top?",
    answer: "legs",
    difficulty: "medium",
    points: 20,
    hint: "Body parts",
    timeLimit: 20
  },
  {
    id: 148,
    question: "What has four wheels and flies?",
    answer: "garbage truck",
    difficulty: "medium",
    points: 20,
    hint: "Think about waste disposal",
    timeLimit: 20
  },
  {
    id: 149,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "medium",
    points: 20,
    hint: "Used on mail",
    timeLimit: 20
  },
  {
    id: 150,
    question: "What has a neck but no head?",
    answer: "bottle",
    difficulty: "medium",
    points: 20,
    hint: "Container for liquids",
    timeLimit: 20
  },
  {
    id: 151,
    question: "What can be cracked, made, told, and played?",
    answer: "joke",
    difficulty: "medium",
    points: 20,
    hint: "Makes people laugh",
    timeLimit: 20
  },
  {
    id: 152,
    question: "What can you serve but never eat?",
    answer: "tennis ball",
    difficulty: "medium",
    points: 20,
    hint: "Sports equipment",
    timeLimit: 20
  },
  {
    id: 153,
    question: "What has teeth but cannot bite?",
    answer: "comb",
    difficulty: "medium",
    points: 20,
    hint: "Grooming tool",
    timeLimit: 20
  },
  {
    id: 154,
    question: "What runs around a house but never moves?",
    answer: "fence",
    difficulty: "medium",
    points: 20,
    hint: "Property boundary",
    timeLimit: 20
  },
  {
    id: 155,
    question: "What can be broken but never held?",
    answer: "promise",
    difficulty: "medium",
    points: 20,
    hint: "Not physical",
    timeLimit: 20
  },
  {
    id: 156,
    question: "What has branches but no fruit, trunk or leaves?",
    answer: "bank",
    difficulty: "medium",
    points: 20,
    hint: "Financial institution",
    timeLimit: 20
  },
  {
    id: 157,
    question: "What has words but never speaks?",
    answer: "book",
    difficulty: "medium",
    points: 20,
    hint: "Contains information",
    timeLimit: 20
  },
  {
    id: 158,
    question: "What has a ring but no finger?",
    answer: "telephone",
    difficulty: "medium",
    points: 20,
    hint: "Communication device",
    timeLimit: 20
  },
  {
    id: 159,
    question: "What has cities but no houses, forests but no trees, and rivers but no water?",
    answer: "map",
    difficulty: "medium",
    points: 20,
    hint: "Navigation tool",
    timeLimit: 20
  },
  {
    id: 160,
    question: "What can fly without wings?",
    answer: "time",
    difficulty: "medium",
    points: 20,
    hint: "Always moving forward",
    timeLimit: 20
  },
  {
    id: 161,
    question: "I have only two words but thousands of letters. What am I?",
    answer: "post office",
    difficulty: "medium",
    points: 20,
    hint: "Think about mail delivery",
    timeLimit: 20
  },
  {
    id: 162,
    question: "What can travel all around the world while remaining stuck in a corner?",
    answer: "stamp",
    difficulty: "medium",
    points: 20,
    hint: "Used on envelopes",
    timeLimit: 20
  },
  {
    id: 163,
    question: "What can you hold in your right hand but never in your left?",
    answer: "your left hand",
    difficulty: "medium",
    points: 20,
    hint: "It's a part of your body",
    timeLimit: 20
  },
  {
    id: 164,
    question: "What has many teeth but cannot bite?",
    answer: "comb",
    difficulty: "medium",
    points: 20,
    hint: "Used for hair",
    timeLimit: 20
  },
  {
    id: 165,
    question: "You go at red and stop at green. What am I?",
    answer: "watermelon",
    difficulty: "medium",
    points: 20,
    hint: "It's a fruit",
    timeLimit: 20
  },
  {
    id: 166,
    question: "How much dirt is in a hole that measures four feet by four feet by five feet?",
    answer: "none",
    difficulty: "medium",
    points: 20,
    hint: "Think about what a hole is",
    timeLimit: 20
  },
  {
    id: 167,
    question: "What can you fill with empty hands?",
    answer: "gloves",
    difficulty: "medium",
    points: 20,
    hint: "Worn on hands",
    timeLimit: 20
  },
  {
    id: 168,
    question: "What disappears the moment you say its name?",
    answer: "silence",
    difficulty: "medium",
    points: 20,
    hint: "Absence of sound",
    timeLimit: 20
  },
  {
    id: 169,
    question: "What kind of coat is best to put on wet?",
    answer: "coat of paint",
    difficulty: "medium",
    points: 20,
    hint: "Think about home improvement",
    timeLimit: 20
  },
  {
    id: 170,
    question: "What type of cheese is made backward?",
    answer: "edam",
    difficulty: "medium",
    points: 20,
    hint: "Read it in reverse",
    timeLimit: 20
  },
  {
    id: 171,
    question: "What is the one thing everyone can agree is between heaven and earth?",
    answer: "and",
    difficulty: "medium",
    points: 20,
    hint: "Look at the phrase 'heaven and earth'",
    timeLimit: 20
  },
  {
    id: 172,
    question: "I can make sounds, but I cannot be played. What am I?",
    answer: "voice",
    difficulty: "medium",
    points: 20,
    hint: "You use it to speak",
    timeLimit: 20
  },
  {
    id: 173,
    question: "I am higher without a head. What am I?",
    answer: "pillow",
    difficulty: "medium",
    points: 20,
    hint: "Used for sleeping",
    timeLimit: 20
  },
  {
    id: 174,
    question: "I have 13 hearts but no lungs or stomach. What am I?",
    answer: "deck of cards",
    difficulty: "medium",
    points: 20,
    hint: "Used for games",
    timeLimit: 20
  },
  {
    id: 175,
    question: "I am easy to lift but hard to throw. What am I?",
    answer: "feather",
    difficulty: "medium",
    points: 20,
    hint: "Very lightweight",
    timeLimit: 20
  },
  {
    id: 176,
    question: "When is 'L' greater than 'XL'?",
    answer: "roman numerals",
    difficulty: "medium",
    points: 20,
    hint: "Think about number systems",
    timeLimit: 20
  },
  {
    id: 177,
    question: "The more you take, the more you leave behind. What are they?",
    answer: "footsteps",
    difficulty: "medium",
    points: 20,
    hint: "Made when walking",
    timeLimit: 20
  },
  {
    id: 178,
    question: "I have cities, but not houses. I have mountains, but no trees. I have coasts, but no sand. What am I?",
    answer: "map",
    difficulty: "medium",
    points: 20,
    hint: "Used for navigation",
    timeLimit: 20
  },
  {
    id: 179,
    question: "Without a bridle or a saddle, across a thing, I ride a-straddle. And those I ride, by help of me, though almost blind, are made to see. What am I?",
    answer: "eyeglasses",
    difficulty: "medium",
    points: 20,
    hint: "Vision aid",
    timeLimit: 20
  },
  {
    id: 180,
    question: "If you have me, you want to share me. If you share me, you don't have me. What am I?",
    answer: "secret",
    difficulty: "medium",
    points: 20,
    hint: "Something confidential",
    timeLimit: 20
  }
];

// Add hard difficulty riddles
const hardRiddles = [
  {
    id: 201,
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "echo",
    difficulty: "hard",
    points: 30,
    hint: "Think about sound reflection",
    timeLimit: 15
  },
  {
    id: 202,
    question: "The person who makes it, sells it. The person who buys it, never uses it. The person who uses it, never sees it. What is it?",
    answer: "coffin",
    difficulty: "hard",
    points: 30,
    hint: "Related to funeral services",
    timeLimit: 15
  },
  {
    id: 203,
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "map",
    difficulty: "hard",
    points: 30,
    hint: "You use it for navigation",
    timeLimit: 15
  },
  {
    id: 204,
    question: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    answer: "river",
    difficulty: "hard",
    points: 30,
    hint: "A natural water formation",
    timeLimit: 15
  },
  {
    id: 205,
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    difficulty: "hard",
    points: 30,
    hint: "Think about walking",
    timeLimit: 15
  },
  {
    id: 206,
    question: "I turn once, what is out will not get in. I turn again, what is in will not get out. What am I?",
    answer: "key",
    difficulty: "hard",
    points: 30,
    hint: "Used with locks",
    timeLimit: 15
  },
  {
    id: 207,
    question: "What begins and has no end? What is the ending of all that begins?",
    answer: "death",
    difficulty: "hard",
    points: 30,
    hint: "The ultimate fate of all living things",
    timeLimit: 15
  },
  {
    id: 208,
    question: "I am always hungry and will die if not fed, but whatever I touch will soon turn red. What am I?",
    answer: "fire",
    difficulty: "hard",
    points: 30,
    hint: "It consumes and transforms",
    timeLimit: 15
  },
  {
    id: 209,
    question: "What can fill a room but takes up no space?",
    answer: "light",
    difficulty: "hard",
    points: 30,
    hint: "It illuminates darkness",
    timeLimit: 15
  },
  {
    id: 210,
    question: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
    answer: "pencil lead",
    difficulty: "hard",
    points: 30,
    hint: "Used for writing",
    timeLimit: 15
  },
  {
    id: 211,
    question: "What is seen in the middle of March and April that can't be seen at the beginning or end of either month?",
    answer: "r",
    difficulty: "hard",
    points: 30,
    hint: "Think about the spelling of the months",
    timeLimit: 15
  },
  {
    id: 212,
    question: "What is so fragile that saying its name breaks it?",
    answer: "silence",
    difficulty: "hard",
    points: 30,
    hint: "The absence of sound",
    timeLimit: 15
  },
  {
    id: 213,
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    difficulty: "hard",
    points: 30,
    hint: "Used on mail",
    timeLimit: 15
  },
  {
    id: 214,
    question: "What has a head, a tail, is brown, and has no legs?",
    answer: "penny",
    difficulty: "hard",
    points: 30,
    hint: "A type of coin",
    timeLimit: 15
  },
  {
    id: 215,
    question: "What has one eye but cannot see?",
    answer: "needle",
    difficulty: "hard",
    points: 30,
    hint: "Used for sewing",
    timeLimit: 15
  },
  {
    id: 216,
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    difficulty: "hard",
    points: 30,
    hint: "Think about walking",
    timeLimit: 15
  },
  {
    id: 217,
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "candle",
    difficulty: "hard",
    points: 30,
    hint: "It burns",
    timeLimit: 15
  },
  {
    id: 218,
    question: "What has a neck but no head?",
    answer: "bottle",
    difficulty: "hard",
    points: 30,
    hint: "You drink from it",
    timeLimit: 15
  },
  {
    id: 219,
    question: "What can you catch but not throw?",
    answer: "cold",
    difficulty: "hard",
    points: 30,
    hint: "Related to illness",
    timeLimit: 15
  },
  {
    id: 220,
    question: "What has many keys but can't open a single lock?",
    answer: "piano",
    difficulty: "hard",
    points: 30,
    hint: "A musical instrument",
    timeLimit: 15
  },
  {
    id: 221,
    question: "What gets broken without being held?",
    answer: "promise",
    difficulty: "hard",
    points: 30,
    hint: "Not a physical object",
    timeLimit: 15
  },
  {
    id: 222,
    question: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    answer: "river",
    difficulty: "hard",
    points: 30,
    hint: "Think about nature",
    timeLimit: 15
  },
  {
    id: 223,
    question: "What is always in front of you but can't be seen?",
    answer: "future",
    difficulty: "hard",
    points: 30,
    hint: "Related to time",
    timeLimit: 15
  },
  {
    id: 224,
    question: "What can fill a room but takes up no space?",
    answer: "light",
    difficulty: "hard",
    points: 30,
    hint: "Think about illumination",
    timeLimit: 15
  },
  {
    id: 225,
    question: "What goes up but never comes down?",
    answer: "age",
    difficulty: "hard",
    points: 30,
    hint: "Related to time passing",
    timeLimit: 15
  },
  {
    id: 226,
    question: "Forward, I am heavy; backward, I am not. What am I?",
    answer: "ton",
    difficulty: "hard",
    points: 30,
    hint: "Think about spelling",
    timeLimit: 15
  },
  {
    id: 227,
    question: "What can you hold in your right hand, but never in your left hand?",
    answer: "your left hand",
    difficulty: "hard",
    points: 30,
    hint: "It's a part of your body",
    timeLimit: 15
  },
  {
    id: 228,
    question: "What has hands but cannot clap?",
    answer: "clock",
    difficulty: "hard",
    points: 30,
    hint: "It tells time",
    timeLimit: 15
  },
  {
    id: 229,
    question: "What has four fingers and a thumb, but is not living?",
    answer: "glove",
    difficulty: "hard",
    points: 30,
    hint: "You wear it in winter",
    timeLimit: 15
  },
  {
    id: 230,
    question: "What starts with T, ends with T, and has T in it?",
    answer: "teapot",
    difficulty: "hard",
    points: 30,
    hint: "Used for brewing",
    timeLimit: 15
  },
  {
    id: 231,
    question: "What kind of ship has two mates but no captain?",
    answer: "relationship",
    difficulty: "hard",
    points: 30,
    hint: "Not a physical vessel",
    timeLimit: 15
  },
  {
    id: 232,
    question: "What loses its head in the morning but gets it back at night?",
    answer: "pillow",
    difficulty: "hard",
    points: 30,
    hint: "Used for sleeping",
    timeLimit: 15
  },
  {
    id: 233,
    question: "Poor people have it. Rich people need it. If you eat it you die. What is it?",
    answer: "nothing",
    difficulty: "hard",
    points: 30,
    hint: "It's not a physical object",
    timeLimit: 15
  },
  {
    id: 234,
    question: "What is the longest word in the dictionary?",
    answer: "smiles",
    difficulty: "hard",
    points: 30,
    hint: "There's a mile between the first and last letter",
    timeLimit: 15
  },
  {
    id: 235,
    question: "Throw away the outside and cook the inside, then eat the outside and throw away the inside. What is it?",
    answer: "corn on the cob",
    difficulty: "hard",
    points: 30,
    hint: "A popular summer food",
    timeLimit: 15
  },
  {
    id: 236,
    question: "What is at the end of a rainbow?",
    answer: "w",
    difficulty: "hard",
    points: 30,
    hint: "Think about the spelling of 'rainbow'",
    timeLimit: 15
  },
  {
    id: 237,
    question: "What kind of tree can you carry in your hand?",
    answer: "palm",
    difficulty: "hard",
    points: 30,
    hint: "It's also part of your hand",
    timeLimit: 15
  },
  {
    id: 238,
    question: "They come out at night without being called, and are lost in the day without being stolen. What are they?",
    answer: "stars",
    difficulty: "hard",
    points: 30,
    hint: "Look up at the night sky",
    timeLimit: 15
  },
  {
    id: 239,
    question: "You'll find me in Mercury, Earth, Mars, Jupiter, Saturn and Uranus. But never Neptune, or Venus. What am I?",
    answer: "r",
    difficulty: "hard",
    points: 30,
    hint: "It's a letter",
    timeLimit: 15
  },
  {
    id: 240,
    question: "How many months have 28 days?",
    answer: "all",
    difficulty: "hard",
    points: 30,
    hint: "Think about calendar months",
    timeLimit: 15
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get('difficulty');

  console.log(`Fetching riddles with difficulty: ${difficulty}`);

  if (difficulty === 'easy') {
    // Shuffle the array and return all available easy riddles
    const shuffledRiddles = shuffleArray([...easyRiddles]);
    return NextResponse.json(shuffledRiddles);
  } else if (difficulty === 'medium') {
    // Return medium difficulty riddles
    const shuffledRiddles = shuffleArray([...mediumRiddles]);
    return NextResponse.json(shuffledRiddles);
  } else if (difficulty === 'hard') {
    // Return hard difficulty riddles
    console.log(`Returning ${hardRiddles.length} hard riddles`);
    const shuffledRiddles = shuffleArray([...hardRiddles]);
    return NextResponse.json(shuffledRiddles);
  }

  // Default case - return empty array
  return NextResponse.json([]);
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Helper function to check for duplicate riddles between difficulty levels
function ensureNoDuplicates() {
  const easyQuestions = new Set(easyRiddles.map(r => r.question.toLowerCase().trim()));
  const mediumQuestions = new Set(mediumRiddles.map(r => r.question.toLowerCase().trim()));
  const hardQuestions = new Set(hardRiddles.map(r => r.question.toLowerCase().trim()));
  
  // Check for duplicates between easy and medium
  const easyMediumDuplicates = [...mediumQuestions].filter(q => easyQuestions.has(q));
  
  // Check for duplicates between easy and hard
  const easyHardDuplicates = [...hardQuestions].filter(q => easyQuestions.has(q));
  
  // Check for duplicates between medium and hard
  const mediumHardDuplicates = [...hardQuestions].filter(q => mediumQuestions.has(q));
  
  if (easyMediumDuplicates.length > 0 || easyHardDuplicates.length > 0 || mediumHardDuplicates.length > 0) {
    console.warn(`Found duplicates: ${easyMediumDuplicates.length} between easy-medium, ${easyHardDuplicates.length} between easy-hard, ${mediumHardDuplicates.length} between medium-hard`);
    // In a real app, you might want to log these or handle them
  }
  
  return easyMediumDuplicates.length === 0 && easyHardDuplicates.length === 0 && mediumHardDuplicates.length === 0;
}

// Run check when module loads
ensureNoDuplicates();

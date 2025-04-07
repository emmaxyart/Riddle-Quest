export const generateHint = (riddle: string, answer: string): string => {
  const strategies = [
    // First 3 letters hint
    () => {
      const firstThreeLetters = answer.slice(0, 3).toLowerCase();
      return `The answer starts with "${firstThreeLetters}..."`;
    },
    // Length hint
    () => `The answer has ${answer.length} letters`,
    // Category hint
    () => {
      const categories = {
        'walk': 'furniture',
        'see': 'vision',
        'write': 'stationery',
        'key': 'technology',
        'water': 'household',
        'food': 'kitchen',
      };
      
      const matchedCategory = Object.entries(categories).find(([key]) => 
        riddle.toLowerCase().includes(key)
      );
      
      return matchedCategory 
        ? `This is related to ${matchedCategory[1]}`
        : `Think about everyday objects`;
    },
    // Vowels hint
    () => {
      const vowels = answer.match(/[aeiou]/gi);
      return vowels 
        ? `The answer contains ${vowels.length} vowel${vowels.length > 1 ? 's' : ''}`
        : `The answer has very few vowels`;
    }
  ];

  // Always return the first 3 letters hint instead of random
  return strategies[0]();
};

export const socialConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://emmaxyy-riddle-game.vercel.app/',
  defaultTitle: 'Riddle Quest - Test Your Wit!',
  defaultDescription: 'Challenge yourself with engaging riddles and compete with friends!',
  social: {
    twitter: 'www.twitter.com',
    facebook: 'www.facebook.com',
  },
};

export const achievementEmojis: Record<string, string> = {
  'Perfect Score': '🏆',
  'Speed Demon': '⚡',
  'No Hints Used': '🎯',
  'First Win': '🌟',
  'Streak Master': '🔥',
};

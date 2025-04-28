export const socialConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://[YOUR-WEBSITE-URL]',
  defaultTitle: 'Riddle Quest - Test Your Wit!',
  defaultDescription: 'Challenge yourself with engaging riddles and compete with friends!',
  social: {
    twitter: '@yourtwitterhandle',
    facebook: 'yourfacebookpage',
  },
};

export const achievementEmojis: Record<string, string> = {
  'Perfect Score': '🏆',
  'Speed Demon': '⚡',
  'No Hints Used': '🎯',
  'First Win': '🌟',
  'Streak Master': '🔥',
};
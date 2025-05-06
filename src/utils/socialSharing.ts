import { GameStats } from '@/types';

export async function shareToSocial(
  platform: 'twitter' | 'facebook' | 'whatsapp' | 'clipboard',
  stats: GameStats
): Promise<{ success: boolean; message?: string }> {
  const difficultyEmoji = {
    easy: '🟢',
    medium: '🟡',
    hard: '🔴'
  }[stats.difficulty];

  const baseMessage = 
    `🎮 Riddle Quest Challenge!\n\n` +
    `${difficultyEmoji} Score: ${stats.score} points\n` +
    `⭐ ${stats.correctAnswers}/${stats.totalRiddles} Riddles Solved\n` +
    `⏱️ Average Time: ${(stats.timeElapsed / stats.correctAnswers).toFixed(1)}s\n` +
    `💭 Hints Used: ${stats.hintsUsed}\n` +
    (stats.achievements.length > 0 ? `\n🏆 Achievements Unlocked:\n${stats.achievements.map(a => `• ${a}`).join('\n')}\n` : '') +
    `\n🎯 Think you can beat my score? Try now at`;

  const encodedMessage = encodeURIComponent(baseMessage);
  const url = encodeURIComponent(window.location.origin);

  try {
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}&url=${url}`, '_blank');
        return { success: true };

      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedMessage}`, '_blank');
        return { success: true };

      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedMessage} ${url}`, '_blank');
        return { success: true };

      case 'clipboard':
        await navigator.clipboard.writeText(`${baseMessage} ${window.location.origin}`);
        return { success: true, message: 'Copied to clipboard!' };

      default:
        return { success: false, message: 'Unsupported platform' };
    }
  } catch (error) {
    console.error('Sharing failed:', error);
    return { success: false, message: 'Failed to share' };
  }
}




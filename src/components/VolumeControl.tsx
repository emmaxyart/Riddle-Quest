import { useState } from 'react';
import { setMusicVolume } from '@/utils/music';

export default function VolumeControl() {
  const [volume, setVolume] = useState(30); // 0-100 range

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setMusicVolume(newVolume / 100); // Convert to 0-1 range
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">🔈</span>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="w-20 h-1 bg-foreground/20 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-sm">🔊</span>
    </div>
  );
}

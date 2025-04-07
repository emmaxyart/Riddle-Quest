class MusicPlayer {
  private static instance: MusicPlayer;
  private music: HTMLAudioElement | null = null;
  private volume: number = 0.3; // Fixed default volume at 30%

  private constructor() {
    if (typeof window !== 'undefined') {
      this.music = new Audio('/sounds/jungle-ish-beat-for-video-games-314073.mp3');
      
      this.music.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
      });

      this.music.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
      });

      this.music.loop = true;
      this.music.volume = this.volume;
      this.music.load();
    }
  }

  public static getInstance(): MusicPlayer {
    if (!MusicPlayer.instance) {
      MusicPlayer.instance = new MusicPlayer();
    }
    return MusicPlayer.instance;
  }

  public play(): void {
    if (this.music) {
      const playPromise = this.music.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Playback failed:', error);
        });
      }
    }
  }

  public pause(): void {
    if (this.music) {
      this.music.pause();
    }
  }

  public setVolume(volume: number): void {
    if (this.music) {
      this.volume = Math.max(0, Math.min(1, volume));
      this.music.volume = this.volume;
    }
  }

  public isPlaying(): boolean {
    return this.music ? !this.music.paused : false;
  }
}

export const playBackgroundMusic = (): void => {
  MusicPlayer.getInstance().play();
};

export const pauseBackgroundMusic = (): void => {
  MusicPlayer.getInstance().pause();
};

export const setMusicVolume = (volume: number): void => {
  MusicPlayer.getInstance().setVolume(volume);
};

export const isMusicPlaying = (): boolean => {
  return MusicPlayer.getInstance().isPlaying();
};



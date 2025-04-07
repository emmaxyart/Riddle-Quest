class SoundPlayer {
  private static instance: SoundPlayer;
  private sounds: { [key: string]: HTMLAudioElement } = {};

  private constructor() {
    this.sounds = {
      success: new Audio('/sounds/successed-295058.mp3'),
      failure: new Audio('/sounds/game-fail-90322.mp3')
    };

    // Preload sounds
    Object.values(this.sounds).forEach(sound => {
      sound.load();
    });
  }

  public static getInstance(): SoundPlayer {
    if (!SoundPlayer.instance) {
      SoundPlayer.instance = new SoundPlayer();
    }
    return SoundPlayer.instance;
  }

  public play(soundName: 'success' | 'failure'): void {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.warn('Sound playback failed:', error);
      });
    }
  }
}

export const playSound = (soundName: 'success' | 'failure'): void => {
  SoundPlayer.getInstance().play(soundName);
};
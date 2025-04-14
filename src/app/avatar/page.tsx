'use client';

import { useGame } from '@/context/GameContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AvatarUpload() {
  const { user, updateAvatar } = useGame();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setError('');
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !preview) {
      setError('Please select an image');
      return;
    }

    try {
      await updateAvatar(preview);
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Avatar upload failed:', error);
      setError('Failed to update avatar');
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-xl border border-foreground/20 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Choose Your Avatar</h1>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500 relative">
            {preview ? (
              <Image
                src={preview}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-foreground/20 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            )}
          </div>

          <label className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="w-full px-4 py-2 text-center rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors cursor-pointer">
              Select Image
            </div>
          </label>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Avatar
          </button>

          <button
            onClick={handleSkip}
            className="w-full px-4 py-2 rounded-lg bg-foreground/20 hover:bg-foreground/30 transition-colors"
          >
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
}
